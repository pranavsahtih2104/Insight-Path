package com.insightpath.repository;

import com.insightpath.model.Scenario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScenarioRepository extends MongoRepository<Scenario, String> {
}
