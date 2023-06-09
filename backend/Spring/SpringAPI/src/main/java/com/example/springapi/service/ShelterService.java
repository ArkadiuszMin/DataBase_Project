package com.example.springapi.service;

import com.example.springapi.api.JsonObjects.AddShelterFormat;
import com.example.springapi.api.model.Address;
import com.example.springapi.api.model.Shelter;
import com.example.springapi.api.repository.ShelterRepository;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ShelterService {
    private final ShelterRepository shelterRepository;

    public List<Shelter> getAllShelters(){
        return shelterRepository.findAll();
    }

    public Optional<Shelter> getShelterById(String id){
        return shelterRepository.findShelterById(id);
    }

    public ResponseEntity<String> addShelter(AddShelterFormat addShelterFormat){
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
            return new ResponseEntity<>("Shelter added succesfully!", HttpStatus.CREATED);
        }
    }
}
