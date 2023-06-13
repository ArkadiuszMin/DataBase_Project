package com.example.springapi.service;

import com.example.springapi.api.JsonObjects.AddDogFormat;
import com.example.springapi.api.enums.State;
import com.example.springapi.api.model.Dog;
import com.example.springapi.api.model.Shelter;
import com.example.springapi.api.repository.DogRepository;
import com.example.springapi.api.repository.ShelterRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@Service
public class DogService {
    private final DogRepository dogRepository;

    private final ShelterRepository shelterRepository;

    public ResponseEntity<List<Dog>> getAllDogs(){
        try{
            List<Dog> dogs = dogRepository.findAll();
            return new ResponseEntity<>(dogs, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<List<Dog>> getDogByName(String name){
        try{
            List<Dog> dogs = dogRepository.findDogsByName(name);
            return new ResponseEntity<>(dogs, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Dog> getDogById(String id){
        try{
            Optional<Dog> dog =  dogRepository.findDogById(id);
            return dog.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<String> updateDog(AddDogFormat dogFormat){
        try{
            if(dogFormat.getName() == null || dogFormat.getSex() == null
                    || dogFormat.getImgSrc() == null || dogFormat.getShelterId() == null || dogFormat.getDogId() == null){
                return new ResponseEntity<>("You havent provided name, sex, image source or shelterId",
                        HttpStatus.BAD_REQUEST);
            }
            if(dogFormat.getAge() == 0 || dogFormat.getWeight() == 0){
                return new ResponseEntity<>("You havent provided age or weight, or chose it to be 0", HttpStatus.BAD_REQUEST);
            }
            Optional<Dog> dog = dogRepository.findDogById(dogFormat.getDogId());
            if(dog.isEmpty()){
                return new ResponseEntity<>("No dog with provided ID", HttpStatus.NOT_FOUND);
            }
            Optional<Shelter> shelter = shelterRepository.findShelterById(dogFormat.getShelterId());
            if(shelter.isEmpty()){
                return new ResponseEntity<>("No shelter with provided ID", HttpStatus.NOT_FOUND);
            }

            Dog foundDog = dog.get();
            foundDog.setName(dogFormat.getName());
            foundDog.setSex(dogFormat.getSex());
            foundDog.setImgSrc(dogFormat.getImgSrc());
            foundDog.setShelter(shelter.get());
            foundDog.setAge(dogFormat.getAge());
            foundDog.setWeight(dogFormat.getWeight());
            foundDog.setDescription(dogFormat.getDescription());

            dogRepository.save(foundDog);

            return new ResponseEntity<>("Dog updated succesfully", HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<String> addDog(AddDogFormat dogFormat){
        try{
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
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<String> deleteDog(String Id){
        try{
            Optional<Dog> dog = dogRepository.findDogById(Id);
            if (dog.isEmpty()){
                return new ResponseEntity<>("No dog with provided ID in database", HttpStatus.NOT_FOUND);
            }
            dogRepository.deleteById(Id);
            return new ResponseEntity<>("Succesfully deleted a dog", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
