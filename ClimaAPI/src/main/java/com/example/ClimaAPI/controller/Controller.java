package com.example.ClimaAPI.controller;

import com.example.ClimaAPI.service.ClimaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    ClimaService service = new ClimaService();
    @GetMapping("/climaBH")
    public String consultarTemperaturaBH(){return service.consultarTemperaturaBH();}

    @GetMapping("/clima/{cidade}")
    public String consultarTemperaturaCidade(@PathVariable String cidade){return service.consultarTemperaturaCidade(cidade);}

}
