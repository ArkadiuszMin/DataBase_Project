package com.example.springapi.service;

import com.example.springapi.api.JsonObjects.AddAdoptionFormat;
import com.example.springapi.api.enums.State;
import com.example.springapi.api.model.Adopter;
import com.example.springapi.api.model.Adoption;
import com.example.springapi.api.model.Dog;
import com.example.springapi.api.repository.AdopterRepository;
import com.example.springapi.api.repository.AdoptionRepository;
import com.example.springapi.api.repository.DogRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Queue;

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

        Optional<Dog> _dog = dogRepository.findDogById(adoption.getDogId());
        if(!_dog.isPresent()){
            return new ResponseEntity<>("No dog with given id exists", HttpStatus.BAD_REQUEST);
        }
        if(_dog.get().getState()!=State.NIEZAREZERWOWANY){
            return new ResponseEntity<>("Dog already reserved", HttpStatus.BAD_REQUEST);
        }

        if(adoption.getFirstName() == null || adoption.getSecondName() == null){
            return new ResponseEntity<>("No first name or second name provided", HttpStatus.BAD_REQUEST);
        }
        if(adoption.getPhone() == null || adoption.getEmail() == null){
            return new ResponseEntity<>("No phone number or email provided", HttpStatus.BAD_REQUEST);
        }
        if(adoption.getCity() == null || adoption.getPostalCode() == null || adoption.getStreet() == null){
            return new ResponseEntity<>("No valid address provided", HttpStatus.BAD_REQUEST);
        }

        Adopter newAdopter = new Adopter(
                adoption.getFirstName(),
                adoption.getSecondName(),
                adoption.getPhone(),
                adoption.getEmail(),
                adoption.getStreet(),
                adoption.getPostalCode(),
                adoption.getCity());

        //check if adopter already exists
        ExampleMatcher matcher = ExampleMatcher.matchingAll()
                .withIgnoreNullValues()
                .withIgnorePaths("_id");

        Example<Adopter> example = Example.of(newAdopter, matcher);
        Optional<Adopter> foundAdopter = adopterRepository.findOne(example);

        Adopter adopter;
        if(foundAdopter.isPresent()){
            adopter = foundAdopter.get();
        }else{
            adopter = newAdopter;
            adopterRepository.insert(adopter);
        }

        Dog dog = _dog.get();
        Adoption newAdoption = new Adoption(adopter,dog);
        adoptionRepository.insert(newAdoption);
        dog.setState(State.ZAREZERWOWANY);
        dogRepository.save(dog);

        return new ResponseEntity<>("Successfully added new adoption",HttpStatus.CREATED);
    }
    public ResponseEntity<String> confirmAdoption(String adoptionId){
        Optional<Adoption> adoption = adoptionRepository.findById(adoptionId);
        if(!adoption.isPresent()){
            return new ResponseEntity<>("No adoption with given id exists", HttpStatus.BAD_REQUEST);
        }
        if(adoption.get().getState() == State.ZAADOPTOWANY){
            return new ResponseEntity<>("Dog already adopted", HttpStatus.BAD_REQUEST);
        }

        Dog dog = adoption.get().getDog();
        adoption.get().setState(State.ZAADOPTOWANY);
        dog.setState(State.ZAADOPTOWANY);
        adoptionRepository.save(adoption.get());
        dogRepository.save(dog);

        return new ResponseEntity<>("Successfully updated adoption status", HttpStatus.OK);
    }
    public List<Adoption> getAllToConfirm(){
        return adoptionRepository.findAdoptionByState(State.ZAREZERWOWANY);
    }

}
