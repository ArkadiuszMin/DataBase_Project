package com.example.springapi.api.controller;


import com.example.springapi.api.JsonObjects.AddAdoptionFormat;
import com.example.springapi.api.JsonObjects.SheltersDataFormat;
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

    @GetMapping("/byDogId")
    public Adoption getAdoptionByDogId(@RequestParam String id){
        Optional<Adoption> adoption = adoptionService.getAdoptionByDogId(id);
        return  adoption.orElse(null);
    }
    @GetMapping("/byAdoptionId")
    public Adoption getAdoptionByAdoptionId(@RequestParam String id){
        Optional<Adoption> adoption = adoptionService.getAdoptionByAdoptionId(id);
        return  adoption.orElse(null);
    }
    @GetMapping("/byAdopterId")
    public List<Adoption> getAdoptionByAdopterId(@RequestParam String id){
        return adoptionService.getAdoptionsByAdopterId(id);
    }
    @GetMapping("/all")
    public List<Adoption> getAllAdoptions(){
        return adoptionService.getAllAdoptions();
    }
    @PostMapping("/add")
    public ResponseEntity<String> addAdoption(@RequestBody AddAdoptionFormat addAdoptionFormat){
        return adoptionService.addAdoption(addAdoptionFormat);
    }
    @GetMapping("/confirm")
    public ResponseEntity<String> confirmAdoption(@RequestParam String id){
        return adoptionService.confirmAdoption(id);
    }
    @GetMapping("/toConfirm")
    public List<Adoption> getAllToConfirm(){
        return  adoptionService.getAllToConfirm();
    }
    @GetMapping("/data")
    public SheltersDataFormat getShelterData(){
        return adoptionService.getSheltersData();
    }

}
