package com.example.springapi.api.controller;

import com.example.springapi.api.JsonObjects.AddShelterFormat;
import com.example.springapi.api.model.Shelter;
import com.example.springapi.service.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/shelters")
@CrossOrigin("http://localhost:5173")
public class ShelterController {

    private final ShelterService shelterService;

    @Autowired
    public ShelterController(ShelterService shelterService){
        this.shelterService = shelterService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Shelter>> getAllShelters(){
        return shelterService.getAllShelters();
    }

    @GetMapping("/byId")
    public ResponseEntity<Shelter> getShelterById(@RequestParam String id){
        try{
            Optional<Shelter> shelter = shelterService.getShelterById(id);
            return new ResponseEntity<>((Shelter) shelter.orElse(null), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addShelter(@RequestBody AddShelterFormat addShelterFormat){
        return shelterService.addShelter(addShelterFormat);
    }
}
