package com.example.springapi.api.model;

import com.example.springapi.api.enums.State;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document
public class Adoption {

    @Id
    private String adoptionId;
    private Adopter adopter;
    private Dog dog;
    private LocalDate dateConfirmation;
    private LocalDate dateReservation;
    private State state;

    public Adoption(Adopter adopter, Dog dog) {
        this.adopter = adopter;
        this.dog = dog;
        this.dateReservation = LocalDate.now();
        this.state =State.ZAREZERWOWANY;
    }
}
