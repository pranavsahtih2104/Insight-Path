package com.insightpath.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.insightpath.model.Scenario;
import com.insightpath.model.Step;
import com.insightpath.repository.ScenarioRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ScenarioService {

    private final ScenarioRepository scenarioRepository;
    private final GeminiService geminiService;
    private final PromptService promptService;
    private final ObjectMapper objectMapper;

    public ScenarioService(ScenarioRepository scenarioRepository, GeminiService geminiService, PromptService promptService) {
        this.scenarioRepository = scenarioRepository;
        this.geminiService = geminiService;
        this.promptService = promptService;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public Map<String, Object> startScenario(String userPrompt) {
        Scenario scenario = new Scenario();
        scenario.setUserPrompt(userPrompt);
        scenario.setSteps(new ArrayList<>());
        scenario.setCreatedAt(new Date());
        scenario = scenarioRepository.save(scenario);

        return generateNextStep(scenario.getId(), null);
    }

    public Map<String, Object> generateNextStep(String scenarioId, String selectedOption) {
        Scenario scenario = scenarioRepository.findById(scenarioId)
                .orElseThrow(() -> new RuntimeException("Scenario not found with ID: " + scenarioId));

        if (selectedOption != null && !scenario.getSteps().isEmpty()) {
            Step lastStep = scenario.getSteps().get(scenario.getSteps().size() - 1);
            lastStep.setChosenOption(selectedOption);
        }

        int nextStepNumber = scenario.getSteps().size() + 1;
        String prompt = promptService.buildPromptForNextStep(scenario, nextStepNumber);
        
        // Call the API
        String aiResponse = geminiService.getCompletion(prompt);

        // CHECK: If the response is an error string, don't try to parse it as JSON
        if (aiResponse.contains("ERROR") || aiResponse.contains("EXCEPTION")) {
            return Map.of(
                "scenarioId", scenarioId,
                "insight", "AI Error: " + aiResponse,
                "options", List.of("Retry last step"),
                "stepNumber", nextStepNumber
            );
        }

        try {
            // Clean the JSON string
            String cleanedJson = aiResponse.replaceAll("```json", "").replaceAll("```", "").trim();
            int jsonStart = cleanedJson.indexOf('{');
            int jsonEnd = cleanedJson.lastIndexOf('}') + 1;
            
            if (jsonStart != -1 && jsonEnd != -1) {
                cleanedJson = cleanedJson.substring(jsonStart, jsonEnd);
            }

            Step newStep = objectMapper.readValue(cleanedJson, Step.class);
            newStep.setStepNumber(nextStepNumber);
            
            scenario.getSteps().add(newStep);
            scenarioRepository.save(scenario);

            return Map.of(
                "scenarioId", scenario.getId(),
                "stepNumber", newStep.getStepNumber(),
                "insight", newStep.getInsight(),
                "options", newStep.getOptions()
            );
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of(
                "scenarioId", scenarioId,
                "insight", "Format error. Raw: " + aiResponse,
                "options", List.of("Retry last step")
            );
        }
    }

    public Map<String, Object> getResult(String scenarioId) {
        Scenario scenario = scenarioRepository.findById(scenarioId)
                .orElseThrow(() -> new RuntimeException("Scenario not found"));

        Map<String, Object> result = new HashMap<>();
        result.put("decisionPath", scenario.getSteps());
        
        if (!scenario.getSteps().isEmpty()) {
            Step lastStep = scenario.getSteps().get(scenario.getSteps().size() - 1);
            result.put("summary", "Analysis complete after " + scenario.getSteps().size() + " steps.");
            result.put("analysis", lastStep.getInsight());
        }
        return result;
    }
}