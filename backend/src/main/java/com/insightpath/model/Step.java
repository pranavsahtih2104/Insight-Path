package com.insightpath.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Step {
    private int stepNumber;
    private String insight;
    private List<String> options;
    private String chosenOption;
}
