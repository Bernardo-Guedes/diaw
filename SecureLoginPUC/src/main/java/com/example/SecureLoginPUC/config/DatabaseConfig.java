package com.example.SecureLoginPUC.config;

import com.example.SecureLoginPUC.entities.User;
import com.example.SecureLoginPUC.repositories.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatabaseConfig {

    @Bean
    CommandLineRunner createDefaultUsers(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            UserConfig userConfig
    ) {

        return args -> {

            if (!userRepository.existsByEmail(
                    userConfig.getUserEmail()
            )) {

                User bernardo = new User(
                        userConfig.getUserUsername(),
                        userConfig.getUserEmail(),
                        passwordEncoder.encode(userConfig.getUserPassword()),
                        "USER"
                );

                userRepository.save(bernardo);
            }

            if (!userRepository.existsByEmail(
                    userConfig.getAdminEmail()
            )) {

                User admin = new User(
                        userConfig.getAdminUsername(),
                        userConfig.getAdminEmail(),
                        passwordEncoder.encode(
                                userConfig.getAdminPassword()
                        ),
                        "ADMIN"
                );

                userRepository.save(admin);
            }
        };
    }
}