package com.example.springapi.api.model;

import com.example.springapi.api.enums.Sex;
import com.example.springapi.api.enums.State;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Dog {

    @Id
    private String id;
    private String name;
    private int weight;
    private Sex sex;
    private int age;
    private String description;
    private String imgSrc;
    private State state;

    private Shelter shelter;

    public Dog(String name, int weight, Sex sex, int age, String description, String imgSrc, State state, Shelter shelter) {
        this.name = name;
        this.weight = weight;
        this.sex = sex;
        this.age = age;
        this.description = description;
        this.imgSrc = imgSrc;
        this.state = state;
        this.shelter = shelter;
    }
}
