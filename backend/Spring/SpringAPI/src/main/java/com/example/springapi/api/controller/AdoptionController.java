package com.example.springapi.api.controller;


import com.example.springapi.api.JsonObjects.AddAdoptionFormat;
import com.example.springapi.api.model.Adoption;
import com.example.springapi.service.AdoptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/adoptions")
@CrossOrigin("http://localhost:5173")
public class AdoptionController {
    private final AdoptionService adoptionService;

    @Autowired
    public AdoptionController(AdoptionService adoptionService){
        this.adoptionService = adoptionService;
    }

    @GetMapping("/bydogid")
    public Adoption getAdoptionByDogId(@RequestParam String dogId){
        Optional<Adoption> adoption = adoptionService.getAdoptionByDogId(dogId);
        return  adoption.orElse(null);
    }
    @GetMapping("/byadoptionid")
    public Adoption getAdoptionByAdoptionId(@RequestParam String adoptionId){
        Optional<Adoption> adoption = adoptionService.getAdoptionByAdoptionId(adoptionId);
        return  adoption.orElse(null);
    }
    @GetMapping("/byadopterid")
    public List<Adoption> getAdoptionByAdopterId(@RequestParam String adopterId){
        return adoptionService.getAdoptionsByAdopterId(adopterId);
    }
    @GetMapping("/all")
    public List<Adoption> getAllAdoptions(){
        return adoptionService.getAllAdoptions();
    }
    @PostMapping("/add")
    public ResponseEntity<String> addAdoption(@RequestBody AddAdoptionFormat addAdoptionFormat){
        return adoptionService.addAdoption(addAdoptionFormat);
    }

}
