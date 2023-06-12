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
        try{
            return new ResponseEntity<>(adopterService.getAllAdopters(), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
    @GetMapping("/byId")
    public ResponseEntity<Adopter> getAdopterById(@RequestParam String id){
        try{
            Optional<Adopter> adopter = adopterService.getAdopterById(id);
            if(adopter.isEmpty()){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(adopter.get(),HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
