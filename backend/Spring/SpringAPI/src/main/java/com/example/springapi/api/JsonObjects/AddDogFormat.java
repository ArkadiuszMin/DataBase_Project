package com.example.springapi.api.JsonObjects;

import com.example.springapi.api.enums.Sex;
import lombok.Data;

@Data
public class AddDogFormat {
    private String name;
    private int weight;
    private Sex sex;
    private int age;
    private String description;
    private String imgSrc;
    private String shelterId;
}
