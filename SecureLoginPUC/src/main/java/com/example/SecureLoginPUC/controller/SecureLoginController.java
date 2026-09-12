package com.example.SecureLoginPUC.controller;

import com.example.SecureLoginPUC.services.PasswordResetService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

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

    private final PasswordResetService passwordResetService;

    public SecureLoginController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/recoverpassword")
    public String handleRecoverPassword(@RequestParam("email") String email){
        passwordResetService.createPasswordResetTokenAndSendEmail(email);
        // Sempre redireciona com a mesma mensagem, exista o e-mail ou não
        return "redirect:/recoverpassword?sent=true";
    }

    @GetMapping("/resetpassword")
    public String resetPasswordPage(@RequestParam("token") String token, Model model) {
        if (!passwordResetService.isValidToken(token)) {
            return "redirect:/error";
        }
        model.addAttribute("token", token);
        return "resetpassword";
    }

    @PostMapping("/resetpassword")
    public String handleResetPassword(@RequestParam("token") String token, @RequestParam("password") String password) {
        boolean success = passwordResetService.resetPassword(token, password);
        return success ? "redirect:/login?reset=true" : "redirect:/error";
    }
}
