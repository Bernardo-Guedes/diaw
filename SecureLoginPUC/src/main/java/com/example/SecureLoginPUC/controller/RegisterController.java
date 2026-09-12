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
            System.out.println("Registro: Redirecionando para a página de login.");
            return "redirect:/login";

        } catch (RuntimeException e) {
            System.out.println("Erro ao realizar registro: " + e.getMessage());
            return "redirect:/register?error=true";
        }
    }
}