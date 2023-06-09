package com.example.springapi.api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Sex {
    SAMIEC, SAMICZKA;

    @JsonCreator
    public static Sex fromString(String key){
        for(Sex sex: Sex.values()){
            if(sex.name().equalsIgnoreCase(key)){
                return sex;
            }
        }
        return null;
    }
}
