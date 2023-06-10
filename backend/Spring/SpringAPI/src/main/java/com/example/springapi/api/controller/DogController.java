package com.example.springapi.api.controller;

import com.example.springapi.api.JsonObjects.AddDogFormat;
import com.example.springapi.api.JsonObjects.UpdateShelterFormat;
import com.example.springapi.api.model.Dog;
import com.example.springapi.service.DogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/dogs")
@CrossOrigin("http://localhost:5173")
public class DogController {

    private final DogService dogService;

    @Autowired
    public DogController(DogService dogService){
        this.dogService = dogService;
    }

    @GetMapping("/all")
    public List<Dog> getAllDogs(){
        return dogService.getAllDogs();
    }

    @GetMapping("/byName")
    public List<Dog> getDogByName(@RequestParam String name){
        List<Dog> dogs = dogService.getDogByName(name);
        System.out.println("Dog id: " + dogs.get(0).getId());
        return dogs;
    }

    @GetMapping("/byId")
    public ResponseEntity<Dog> getDogById(@RequestParam String id){
        return dogService.getDogById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addDog(@RequestBody AddDogFormat dogFormat){
         return dogService.addDog(dogFormat);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateDog(@RequestBody AddDogFormat dogFormat){ return dogService.updateDog(dogFormat);}


}
