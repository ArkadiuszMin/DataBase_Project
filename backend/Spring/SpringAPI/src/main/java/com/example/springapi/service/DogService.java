package com.example.springapi.service;

import com.example.springapi.api.JsonObjects.AddDogFormat;
import com.example.springapi.api.JsonObjects.UpdateShelterFormat;
import com.example.springapi.api.enums.State;
import com.example.springapi.api.model.Dog;
import com.example.springapi.api.model.Shelter;
import com.example.springapi.api.repository.DogRepository;
import com.example.springapi.api.repository.ShelterRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@Service
public class DogService {
    private final DogRepository dogRepository;

    private final ShelterRepository shelterRepository;

    public List<Dog> getAllDogs(){
        return dogRepository.findAll();
    }

    public List<Dog> getDogByName(String name){
        return dogRepository.findDogsByName(name);
    }

    public ResponseEntity<Dog> getDogById(String id){

        Optional<Dog> dog =  dogRepository.findDogById(id);
        return dog.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<String> updateDogsShelter(UpdateShelterFormat updateShelterFormat){
        String dogId = updateShelterFormat.getDogId();
        String shelterId = updateShelterFormat.getShelterId();
        if(shelterId == null || dogId == null){
            return new ResponseEntity<>("Provide dogs ID and shelter ID", HttpStatus.BAD_REQUEST);
        }
        Optional<Dog> dog = dogRepository.findDogById(dogId);
        if(dog.isEmpty()){
            return new ResponseEntity<>("No dog with provided ID", HttpStatus.NOT_FOUND);
        }
        Optional<Shelter> shelter = shelterRepository.findShelterById(shelterId);
        if(shelter.isEmpty()){
            return new ResponseEntity<>("No shelter with provided ID", HttpStatus.NOT_FOUND);
        }
        Dog foundDog = dog.get();
        foundDog.setShelter(shelter.get());
        dogRepository.save(foundDog);
        return new ResponseEntity<>("Shelter changed succesfully", HttpStatus.OK);
    }

    public ResponseEntity<String> addDog(AddDogFormat dogFormat){
        if(dogFormat.getName() == null || dogFormat.getSex() == null || dogFormat.getImgSrc() == null || dogFormat.getShelterId() == null){
            return new ResponseEntity<>("You havent provided name, sex, image source or shelterId", HttpStatus.BAD_REQUEST);
        }
        if(dogFormat.getAge() == 0 || dogFormat.getWeight() == 0){
            return new ResponseEntity<>("You havent provided age or weight, or chose it to be 0", HttpStatus.BAD_REQUEST);
        }
        if(dogFormat.getDescription() == null){
            dogFormat.setDescription("Brak");
        }
        Optional<Shelter> shelter = shelterRepository.findShelterById(dogFormat.getShelterId());
        if(shelter.isPresent()){
            Dog dog = new Dog(dogFormat.getName(),
                            dogFormat.getWeight(),
                            dogFormat.getSex(),
                            dogFormat.getAge(),
                            dogFormat.getDescription(),
                            dogFormat.getImgSrc(),
                            State.NIEZAREZERWOWANY,
                            shelter.get());
            dogRepository.insert(dog);
            return new ResponseEntity<>("Succesfully added a dog to database", HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>("Shelter with provided ID doesnt exists", HttpStatus.NOT_FOUND);
        }
    }
}
