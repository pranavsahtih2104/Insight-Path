package com.insightpath.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public GeminiService() {
        this.restTemplate = new RestTemplate();
    }

    public String getCompletion(String prompt) {
        if (apiKey == null || apiKey.isEmpty()) {
            return "ERROR: API Key is missing.";
        }

        // UPDATED: Using the stable Gemini 2.5 Flash model from your list
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

        Map<String, Object> body = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", prompt)
                ))
            )
        );

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, body, Map.class);
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List<Map> candidates = (List<Map>) response.getBody().get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map content = (Map) candidates.get(0).get("content");
                    List<Map> parts = (List<Map>) content.get("parts");
                    return (String) parts.get(0).get("text");
                }
            }
            return "ERROR: API Status " + response.getStatusCode();
        } catch (HttpClientErrorException e) {
            return "API_ERROR: " + e.getResponseBodyAsString();
        } catch (Exception e) {
            return "EXCEPTION: " + e.getMessage();
        }
    }
}