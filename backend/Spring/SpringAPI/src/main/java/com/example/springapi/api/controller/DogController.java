package com.example.springapi.api.controller;

import com.example.springapi.api.JsonObjects.AddDogFormat;
import com.example.springapi.api.model.Dog;
import com.example.springapi.service.DogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<Dog>> getAllDogs(){
        return dogService.getAllDogs();
    }

    @GetMapping("/byName")
    public ResponseEntity<List<Dog>> getDogByName(@RequestParam String name){
        return dogService.getDogByName(name);
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

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteDog(@RequestParam String id){
        return dogService.deleteDog(id);
    }


}
