package com.example.springapi;

import com.example.springapi.api.model.Address;
import com.example.springapi.api.model.Dog;
import com.example.springapi.api.model.Shelter;
import com.example.springapi.api.repository.DogRepository;
import com.example.springapi.api.repository.ShelterRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@SpringBootApplication
public class SpringApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringApiApplication.class, args);
    }

}
