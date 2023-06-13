package com.example.springapi.service;

import com.example.springapi.api.enums.State;
import com.example.springapi.api.model.Adopter;
import com.example.springapi.api.model.Adoption;
import com.example.springapi.api.repository.AdopterRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdopterService {
    private final AdopterRepository adopterRepository;
    public ResponseEntity<List<Adopter>> getAllAdopters(){
        try {
            return new ResponseEntity<>(adopterRepository.findAll(), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<Adopter> getAdopterById(String Id){
        try{
            Optional<Adopter> adopter =  adopterRepository.findAdopterById(Id);
            if(adopter.isEmpty()){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(adopter.get(),HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
