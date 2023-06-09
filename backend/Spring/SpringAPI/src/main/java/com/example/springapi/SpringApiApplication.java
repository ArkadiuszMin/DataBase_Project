package com.example.springapi;

import com.example.springapi.api.model.Address;
import com.example.springapi.api.model.Dog;
import com.example.springapi.api.model.Shelter;
import com.example.springapi.api.repository.DogRepository;
import com.example.springapi.api.repository.ShelterRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@SpringBootApplication
public class SpringApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringApiApplication.class, args);
    }

//    @Bean
//    CommandLineRunner runner(DogRepository dogRepository, ShelterRepository shelterRepository, MongoTemplate mongoTemplate){
//        return args -> {
//            Address address = new Address("Bukowa", "32-040");
//            String name = "Schronisko dachowanie";
//            Shelter shelter = new Shelter(name, address);
//
//            shelterRepository.findShelterByName(name)
//                    .ifPresentOrElse(s -> {
//                        System.out.println("The shelter already exists");
//                    }, () -> {
//                        System.out.println("Adding new shelter and Doggo!");
//                        shelterRepository.insert(shelter);
//                        Dog doggo = new Dog( "John",
//                                20,
//                                "Male",
//                                5,
//                                "Fajny",
//                                "costam",
//                                "N",
//                                shelter);
//                        dogRepository.insert(doggo);
//                    });
//
////            if(isShelterWithGivenName(shelterRepository, mongoTemplate, name)){
////                System.out.println("Adding new shelter and Doggo!");
////                shelterRepository.insert(shelter);
////                Dog doggo = new Dog( "John",
////                        20,
////                        "Male",
////                        5,
////                        "Fajny",
////                        "costam",
////                        "N",
////                        shelter);
////                dogRepository.insert(doggo);
////            }
////            else{
////                System.out.println("The shelter already exists");
////            }
//
//        };
//    }

    private boolean isShelterWithGivenName(ShelterRepository shelterRepository, MongoTemplate mongoTemplate, String name){
        Query query = new Query();
        query.addCriteria(Criteria.where("name").is(name));

        List<Shelter> shelters = mongoTemplate.find(query, Shelter.class);

        return shelters.isEmpty();
    }
}
