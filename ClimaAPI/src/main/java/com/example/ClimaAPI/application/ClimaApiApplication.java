package com.example.ClimaAPI.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.example"})
public class ClimaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClimaApiApplication.class, args);
	}

}
