package com.example.springapi.api.JsonObjects;

import lombok.Data;

@Data
public class AddAdoptionFormat {
    private String firstName;
    private String secondName;
    private String phone;
    private String email;
    private String street;
    private String postalCode;
    private String city;
    private String dogId;
}
