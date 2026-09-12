package com.example.SecureLoginPUC.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.example"})
public class SecureLoginPucApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecureLoginPucApplication.class, args);
	}

}
