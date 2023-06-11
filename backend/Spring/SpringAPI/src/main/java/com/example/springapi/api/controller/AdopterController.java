package com.example.springapi.api.controller;

import com.example.springapi.api.model.Adopter;
import com.example.springapi.service.AdopterService;
import org.springframework.beans.factory.annotation.Autowired;

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
    public List<Adopter> getAllAdopters(){
        return adopterService.getAllAdopters();
    }
    @GetMapping("/byId")
    public Adopter getAdopterById(@RequestParam String id){
        Optional<Adopter> adopter = adopterService.getAdopterById(id);
        return adopter.orElse(null);
    }
}
