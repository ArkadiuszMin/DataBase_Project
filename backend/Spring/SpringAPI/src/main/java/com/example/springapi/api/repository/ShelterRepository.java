package com.example.springapi.api.repository;

import com.example.springapi.api.model.Shelter;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ShelterRepository extends MongoRepository<Shelter, String> {
   Optional<Shelter> findShelterByName(String name);
   Optional<Shelter> findShelterById(String id);
}
