package com.example.springapi.api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum State {
    NIEZAREZERWOWANY, ZAREZERWOWANY, ZAADOPTOWANY;

    @JsonCreator
    public static State fromString(String key){
        for(State state: State.values()){
            if(state.name().equalsIgnoreCase(key)){
                return state;
            }
        }
        return null;
    }
}
