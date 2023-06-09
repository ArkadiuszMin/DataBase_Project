package com.example.springapi.api.controller;

import com.example.springapi.api.JsonObjects.AddShelterFormat;
import com.example.springapi.api.model.Address;
import com.example.springapi.api.model.Shelter;
import com.example.springapi.service.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/shelters")
public class ShelterController {

    private final ShelterService shelterService;

    @Autowired
    public ShelterController(ShelterService shelterService){
        this.shelterService = shelterService;
    }

    @GetMapping("/all")
    public List<Shelter> getAllShelters(){
        return shelterService.getAllShelters();
    }

    @GetMapping("/byid")
    public Shelter getShelterById(@RequestParam String id){
        Optional<Shelter> shelter = shelterService.getShelterById(id);
        return (Shelter) shelter.orElse(null);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addShelter(@RequestBody AddShelterFormat addShelterFormat){
        return shelterService.addShelter(addShelterFormat);
    }
}
