package com.example.ClimaAPI.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class ClimaService {
    private static final String BASE_URL = "https://api.open-meteo.com/v1/forecast";
    private static final String BASE_URL_GEO = "https://geocoding-api.open-meteo.com/v1/search";
    private String consultarURL(String apiUrl){
        String dados = "";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(apiUrl, String.class);
        if (responseEntity.getStatusCode().is2xxSuccessful()){
            dados = responseEntity.getBody();
        } else {
            dados = "Falha ao obter dados. Código de status: " + responseEntity.getStatusCode();
        }
        return dados;
    }
    public String consultarTemperaturaBH(){
        // return consultarURL("https://api.open-meteo.com/v1/");
        return consultarURL(BASE_URL + "?latitude=19.9167&longitude=-43.9345&hourly=temperature_2m");
    }

    public String consultarTemperaturaCidade(String cidade){
        return consultarURL(BASE_URL_GEO + "?name="+cidade.replace("-", " ")+"&count=1&language=pt&format=json");
    }
}
