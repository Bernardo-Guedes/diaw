package com.example.SecureLoginPUC.services;

import com.example.SecureLoginPUC.entities.User;
import com.example.SecureLoginPUC.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(String username, String email, String password) {

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("email");
        }

        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("username");
        }

        String passwordEncoded = passwordEncoder.encode(password);

        User user = new User(
                username,
                email,
                passwordEncoded,
                "USER"
        );

        return userRepository.save(user);
    }
}