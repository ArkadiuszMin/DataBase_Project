package com.example.springapi.api.repository;

import com.example.springapi.api.model.Adopter;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AdopterRepository extends MongoRepository<Adopter,String> {
    Optional<Adopter> findAdopterById(String Id);
}
