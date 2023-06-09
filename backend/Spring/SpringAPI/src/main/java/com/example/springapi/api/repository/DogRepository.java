package com.example.springapi.api.repository;

import com.example.springapi.api.model.Dog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface DogRepository extends MongoRepository<Dog, String> {
    List<Dog> findDogsByName(String name);
    Optional<Dog> findDogById(String id);
}
