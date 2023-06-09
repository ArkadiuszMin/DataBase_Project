package com.example.springapi.service;

import com.example.springapi.api.JsonObjects.AddAdoptionFormat;
import com.example.springapi.api.JsonObjects.SheltersDataFormat;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class AdoptionService {
    private final AdoptionRepository adoptionRepository;
    private final DogRepository dogRepository;
    private final AdopterRepository adopterRepository;

    public ResponseEntity<Adoption> getAdoptionByAdoptionId(String id){
        try{
            Optional<Adoption> adoption = adoptionRepository.findAdoptionByAdoptionId(id);
            if(adoption.isEmpty()){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(adoption.get(),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<Adoption> getAdoptionByDogId(String id){
        try{
            Optional<Adoption> adoption = adoptionRepository.findAdoptionByDogId(id);
            if(adoption.isEmpty()){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(adoption.get(),HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<List<Adoption>> getAdoptionsByAdopterId(String id){
        try {
            return new ResponseEntity<>(adoptionRepository.findAdoptionsByAdopterId(id),HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    public ResponseEntity<List<Adoption>> getAllAdoptions(){
        try {
            return new ResponseEntity<>(adoptionRepository.findAll(), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<String> addAdoption(AddAdoptionFormat adoption){
        try {
            Optional<Dog> _dog = dogRepository.findDogById(adoption.getDogId());
            if (!_dog.isPresent()) {
                return new ResponseEntity<>("No dog with given id exists", HttpStatus.BAD_REQUEST);
            }
            if (_dog.get().getState() != State.NIEZAREZERWOWANY) {
                return new ResponseEntity<>("Dog already reserved", HttpStatus.BAD_REQUEST);
            }

            if (adoption.getFirstName() == null || adoption.getSecondName() == null) {
                return new ResponseEntity<>("No first name or second name provided", HttpStatus.BAD_REQUEST);
            }
            if (adoption.getPhone() == null || adoption.getEmail() == null) {
                return new ResponseEntity<>("No phone number or email provided", HttpStatus.BAD_REQUEST);
            }
            if (adoption.getCity() == null || adoption.getPostalCode() == null || adoption.getStreet() == null) {
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
            if (foundAdopter.isPresent()) {
                adopter = foundAdopter.get();
            } else {
                adopter = newAdopter;
                adopterRepository.insert(adopter);
            }

            Dog dog = _dog.get();
            Adoption newAdoption = new Adoption(adopter, dog);
            adoptionRepository.insert(newAdoption);
            dog.setState(State.ZAREZERWOWANY);
            dogRepository.save(dog);

            return new ResponseEntity<>("Successfully added new adoption", HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<String> confirmAdoption(String adoptionId){
        try{
        Optional<Adoption> adoption = adoptionRepository.findById(adoptionId);
        if(!adoption.isPresent()){
            return new ResponseEntity<>("No adoption with given id exists", HttpStatus.BAD_REQUEST);
        }
        if(adoption.get().getState() == State.ZAADOPTOWANY){
            return new ResponseEntity<>("Dog already adopted", HttpStatus.BAD_REQUEST);
        }

        Dog dog = adoption.get().getDog();
        adoption.get().setState(State.ZAADOPTOWANY);
        adoption.get().setDateConfirmation(LocalDate.now());
        dog.setState(State.ZAADOPTOWANY);
        adoptionRepository.save(adoption.get());
        dogRepository.save(dog);
        return new ResponseEntity<>("Successfully updated adoption status", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<List<Adoption>> getAllToConfirm(){
        try {
            return new ResponseEntity<>(adoptionRepository.findAdoptionByState(State.ZAREZERWOWANY), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<List<Adoption>> getAllAdopted(){
        try {
            return new ResponseEntity<>(adoptionRepository.findAdoptionByState(State.ZAADOPTOWANY), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<SheltersDataFormat> getSheltersData(){
        try {
            SheltersDataFormat data = new SheltersDataFormat();
            int adopted = dogRepository.findDogsByState(State.ZAADOPTOWANY).size();
            data.setDogCount(dogRepository.findAll().size() - adopted);
            data.setAdoptedCount(adopted);
            data.setAdoptersCount(adopterRepository.findAll().size());
            return new ResponseEntity<>(data,HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
