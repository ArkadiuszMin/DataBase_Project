package com.example.springapi.service;

import com.example.springapi.api.JsonObjects.AddAdoptionFormat;
import com.example.springapi.api.model.Adopter;
import com.example.springapi.api.model.Adoption;
import com.example.springapi.api.model.Dog;
import com.example.springapi.api.repository.AdopterRepository;
import com.example.springapi.api.repository.AdoptionRepository;
import com.example.springapi.api.repository.DogRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class AdoptionService {
    private final AdoptionRepository adoptionRepository;
    private final DogRepository dogRepository;
    private final AdopterRepository adopterRepository;

    public Optional<Adoption> getAdoptionByAdoptionId(String id){
        return adoptionRepository.findAdoptionByAdoptionId(id);
    }
    public Optional<Adoption> getAdoptionByDogId(String id){
        return adoptionRepository.findAdoptionByDogId(id);
    }
    public List<Adoption> getAdoptionsByAdopterId(String id){
        return adoptionRepository.findAdoptionsByAdopterId(id);
    }
    public List<Adoption> getAllAdoptions(){
        return adoptionRepository.findAll();
    }
    public ResponseEntity<String> addAdoption(AddAdoptionFormat adoption){
        Optional<Adopter> adopter = adopterRepository.findAdopterById(adoption.getAdopterId());
        Optional<Dog> dog = dogRepository.findDogById(adoption.getDogId());

        if(!adopter.isPresent()){
            return new ResponseEntity<>("No adopter with given id exists", HttpStatus.BAD_REQUEST);
        }
        if(!dog.isPresent()){
            return new ResponseEntity<>("No dog with given id exists", HttpStatus.BAD_REQUEST);
        }
        Adoption newAdoption = new Adoption(adopter.get(),dog.get());
        adoptionRepository.insert(newAdoption);
        return new ResponseEntity<>("Successfully added new adoption",HttpStatus.CREATED);

    }
}
