package com.example.springapi.api.JsonObjects;

import lombok.Data;

@Data
public class AddDogFormat {
    private String name;
    private int weight;
    private String sex;
    private int age;
    private String description;
    private String imgSrc;
    private String shelterId;
}
