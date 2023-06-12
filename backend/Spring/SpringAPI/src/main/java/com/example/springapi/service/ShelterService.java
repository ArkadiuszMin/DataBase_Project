package com.example.springapi.service;

import com.example.springapi.api.JsonObjects.AddShelterFormat;
import com.example.springapi.api.model.Address;
import com.example.springapi.api.model.Shelter;
import com.example.springapi.api.repository.ShelterRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ShelterService {
    private final ShelterRepository shelterRepository;

    public ResponseEntity<List<Shelter>> getAllShelters(){
        try{
            List<Shelter> shelters = shelterRepository.findAll();
            return new ResponseEntity<>(shelters, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Optional<Shelter> getShelterById(String id) throws Exception{
        Optional<Shelter> shelter = shelterRepository.findShelterById(id);
        return shelter;
    }

    public ResponseEntity<String> addShelter(AddShelterFormat addShelterFormat){
        try{
            if(addShelterFormat.getName() == null || addShelterFormat.getStreet() == null || addShelterFormat.getPostal() == null){
                return new ResponseEntity<>("You need to provide name, street and postal code of shelter", HttpStatus.BAD_REQUEST);
            }
            Optional<Shelter> foundShelter = shelterRepository.findShelterByName(addShelterFormat.getName());
            if (foundShelter.isPresent()){
                return new ResponseEntity<>("Shelter with the name " + foundShelter.get().getName() + " already exists",
                        HttpStatus.BAD_REQUEST);
            }else{
                Address address = new Address(addShelterFormat.getStreet(), addShelterFormat.getPostal());
                Shelter shelter = new Shelter(addShelterFormat.getName(), address);
                shelterRepository.insert(shelter);
                return new ResponseEntity<>("Shelter added successfully!", HttpStatus.CREATED);
            }
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
