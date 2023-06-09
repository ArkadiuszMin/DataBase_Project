package com.example.springapi.api.model;

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
    private String sex;
    private int age;
    private String description;
    private String imgSrc;
    private String state;

    private Shelter shelter;

    public Dog(String name, int weight, String sex, int age, String description, String imgSrc, String state, Shelter shelter) {
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
