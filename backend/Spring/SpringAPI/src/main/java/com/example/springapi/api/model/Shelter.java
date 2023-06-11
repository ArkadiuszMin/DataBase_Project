package com.example.springapi.api.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Shelter {
    @Id
    private String id;
    private String name;
    private Address address;

    public Shelter(String name, Address address) {
        this.name = name;
        this.address = address;
    }
}
