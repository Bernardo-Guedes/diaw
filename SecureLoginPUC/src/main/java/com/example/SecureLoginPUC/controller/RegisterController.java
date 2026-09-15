package com.example.SecureLoginPUC.controller;

import com.example.SecureLoginPUC.services.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class RegisterController {

    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register";
    }

    @PostMapping("/register")
    public String handleRegister(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password
    ) {

        try {
            userService.register(username, email, password);
            return "redirect:/login";

        } catch (RuntimeException e) {
            return "redirect:/register?error=" + e.getMessage();
        }
    }
}