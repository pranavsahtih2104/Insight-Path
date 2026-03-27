package com.insightpath.service;

import com.insightpath.model.Scenario;
import com.insightpath.model.Step;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromptService {

    public String buildPromptForNextStep(Scenario scenario, int targetStepNumber) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are an AI decision guide. The user is facing the following scenario:\n");
        sb.append("\"").append(scenario.getUserPrompt()).append("\"\n\n");

        sb.append("Here is the history of decisions so far:\n");
        List<Step> steps = scenario.getSteps();
        if (steps != null && !steps.isEmpty()) {
            for (Step step : steps) {
                if (step.getChosenOption() != null) {
                    sb.append("Step ").append(step.getStepNumber()).append(" - Insight: ").append(step.getInsight())
                            .append("\n");
                    sb.append("User chose: ").append(step.getChosenOption()).append("\n\n");
                }
            }
        } else {
            sb.append("There are no previous steps yet. This is the first decision step.\n\n");
        }

        sb.append("This is Step ").append(targetStepNumber).append(".\n");
        sb.append(
                "Evaluate if the user's problem has been fully solved or if a final decision/conclusion has been reached based on their previous choices.\n");
        sb.append(
                "If the problem IS solved, generate a final Insight analyzing the path comprehensively, and leave the options array EMPTY to signify the end of the decision tree.\n");
        sb.append(
                "If the problem is NOT solved and requires further exploration, generate the next logical step with appropriate choices in the options array.\n\n");

        sb.append("You MUST respond in valid JSON format ONLY, without any markdown formatting or extra text. \n");
        sb.append("The JSON structure must match this EXACTLY:\n");
        sb.append("{\n");
        sb.append("  \"stepNumber\": ").append(targetStepNumber).append(",\n");
        sb.append(
                "  \"insight\": \"A brief, insightful explanation of the consequences of the previous choice and the current situation.\",\n");
        sb.append("  \"options\": [\"Option A\", \"Option B\", \"Option C\", \"Option D\"]\n");
        sb.append("}\n");

        return sb.toString();
    }
}
