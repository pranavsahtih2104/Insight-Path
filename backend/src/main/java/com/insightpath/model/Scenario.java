package com.insightpath.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "scenarios")
public class Scenario {
    @Id
    private String id;
    private String userPrompt;
    private List<Step> steps;
    private Date createdAt;
}
