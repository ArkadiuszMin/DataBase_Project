package com.example.springapi.api.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Adopter {
    @Id
    private String id;
    private String firstName;
    private String secondName;
    private String phone;
    private String email;
    private String street;
    private String postalCode;
    private String city;

    public Adopter(String firstName, String secondName, String phone, String email, String street, String postalCode, String city) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.phone = phone;
        this.email = email;
        this.street = street;
        this.postalCode = postalCode;
        this.city = city;
    }
}
