package com.example.springapi.service;

import com.example.springapi.api.model.Adopter;
import com.example.springapi.api.repository.AdopterRepository;
import lombok.AllArgsConstructor;
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
}
