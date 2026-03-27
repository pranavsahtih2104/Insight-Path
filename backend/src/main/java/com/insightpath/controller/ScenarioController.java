package com.insightpath.controller;

import com.insightpath.service.ScenarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/scenario")
public class ScenarioController {

    private final ScenarioService scenarioService;

    public ScenarioController(ScenarioService scenarioService) {
        this.scenarioService = scenarioService;
    }

    @PostMapping("/start")
    public ResponseEntity<Map<String, Object>> startScenario(@RequestBody Map<String, String> request) {
        String prompt = request.get("prompt");
        if (prompt == null || prompt.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(scenarioService.startScenario(prompt));
    }

    @PostMapping("/next")
    public ResponseEntity<Map<String, Object>> getNextStep(@RequestBody Map<String, String> request) {
        String scenarioId = request.get("scenarioId");
        String selectedOption = request.get("selectedOption");
        
        if (scenarioId == null) {
            return ResponseEntity.badRequest().build();
        }
        
        return ResponseEntity.ok(scenarioService.generateNextStep(scenarioId, selectedOption));
    }

    @GetMapping("/result/{scenarioId}")
    public ResponseEntity<Map<String, Object>> getResult(@PathVariable String scenarioId) {
        return ResponseEntity.ok(scenarioService.getResult(scenarioId));
    }
}
