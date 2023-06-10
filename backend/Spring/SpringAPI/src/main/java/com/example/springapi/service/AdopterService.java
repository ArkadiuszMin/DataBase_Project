package com.example.springapi.service;

import com.example.springapi.api.JsonObjects.AddAdopterFormat;
import com.example.springapi.api.model.Adopter;
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

    public List<Adopter> getAllAdopters(){
        return adopterRepository.findAll();
    }

    public Optional<Adopter> getAdopterById(String Id){
        return adopterRepository.findAdopterById(Id);
    }

//    public ResponseEntity<String> addAdopter(AddAdopterFormat adopter){
//        if(adopter.getFirstName() == null || adopter.getSecondName() == null){
//            return new ResponseEntity<>("No first name or second name provided", HttpStatus.BAD_REQUEST);
//        }
//        if(adopter.getPhone() == null || adopter.getEmail() == null){
//            return new ResponseEntity<>("No phone number or email provided", HttpStatus.BAD_REQUEST);
//        }
//        if(adopter.getCity() == null || adopter.getPostalCode() == null || adopter.getStreet() == null){
//            return new ResponseEntity<>("No valid address provided", HttpStatus.BAD_REQUEST);
//        }
//        Adopter newAdopter = new Adopter(
//                adopter.getFirstName(),
//                adopter.getSecondName(),
//                adopter.getPhone(),
//                adopter.getEmail(),
//                adopter.getStreet(),
//                adopter.getPostalCode(),
//                adopter.getCity());
//        adopterRepository.insert(newAdopter);
//        return new ResponseEntity<>("Successfully added new adopter",HttpStatus.CREATED);
//    }
}
