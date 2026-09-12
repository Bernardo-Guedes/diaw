package com.example.SecureLoginPUC.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SecureLoginController {
    @GetMapping("/login")
    public String login(){
        return "login";
    }
    @GetMapping("/home")
    public String home(){
        return "home";
    }
    @GetMapping("/error")
    public String error(){
        return "error";
    }
    @GetMapping("/admin")
    public String admin(){
        return "admin";
    }

    @GetMapping("/recoverpassword")
    public String recoverpassword(){
        return "recoverpassword";
    }

    @PostMapping("/recoverpassword")
    public String handleRecoverPassword(
            @RequestParam("email") String email){

        // Aqui você pode adicionar lógica para recuperar a senha.
        // userService.recoverPassword(email);

        // Redirecionar ou exibir uma mensagem de sucesso
        System.out.println("Recuperaçãode E-mail: Redirecionando para a página de login.");
        return "redirect:/login"; // Após a recuperação de senha, redirecionar para a página de login
    }
}
