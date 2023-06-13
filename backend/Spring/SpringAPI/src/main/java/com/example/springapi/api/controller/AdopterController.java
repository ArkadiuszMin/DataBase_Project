package com.example.springapi.api.controller;

import com.example.springapi.api.model.Adopter;
import com.example.springapi.api.model.Adoption;
import com.example.springapi.service.AdopterService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/adopters")
@CrossOrigin("http://localhost:5173")
public class AdopterController {

    private final AdopterService adopterService;

    @Autowired
    public AdopterController(AdopterService adopterService){
        this.adopterService = adopterService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Adopter>> getAllAdopters(){
        return adopterService.getAllAdopters();
    }
    @GetMapping("/byId")
    public ResponseEntity<Adopter> getAdopterById(@RequestParam String id){
        return adopterService.getAdopterById(id);
    }
}
