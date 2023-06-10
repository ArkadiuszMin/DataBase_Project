package com.example.springapi.api.repository;

import com.example.springapi.api.enums.State;
import com.example.springapi.api.model.Adoption;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface AdoptionRepository extends MongoRepository<Adoption,String> {
    List<Adoption> findAdoptionsByAdopterId(String id);
    Optional<Adoption> findAdoptionByAdoptionId(String id);
    Optional<Adoption> findAdoptionByDogId(String id);
    List<Adoption> findAdoptionByState(State state);
}
