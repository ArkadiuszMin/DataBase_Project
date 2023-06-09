package com.example.springapi.api.controller;


import com.example.springapi.api.JsonObjects.AddAdopterFormat;
import com.example.springapi.api.model.Adopter;
import com.example.springapi.service.AdopterService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/adopters")
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
    @GetMapping("/byid")
    public Adopter getAdopterById(@RequestParam String id){
        Optional<Adopter> adopter = adopterService.getAdopterById(id);
        return adopter.orElse(null);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addAdopter(@RequestBody AddAdopterFormat addAdopterFormat){
        return  adopterService.addAdopter((addAdopterFormat));
    }

}