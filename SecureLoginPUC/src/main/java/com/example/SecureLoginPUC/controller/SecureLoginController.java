package com.example.SecureLoginPUC.controller;

import com.example.SecureLoginPUC.entities.User;
import com.example.SecureLoginPUC.repositories.UserRepository;
import com.example.SecureLoginPUC.services.PasswordResetService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

@Controller
public class SecureLoginController {

    private final PasswordResetService passwordResetService;
    private final UserRepository userRepository;

    public SecureLoginController(PasswordResetService passwordResetService, UserRepository userRepository) {
        this.passwordResetService = passwordResetService;
        this.userRepository = userRepository;
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }
    
    @GetMapping("/home")
    public String home(Model model, Authentication authentication){
        adicionarNomeUsuario(model, authentication);
        return "home";
    }

    @GetMapping("/loginerror")
    public String loginerror(){
        return "loginerror";
    }

    @GetMapping("/admin")
    public String admin(Model model, Authentication authentication){
        adicionarNomeUsuario(model, authentication);
        return "admin";
    }

    private void adicionarNomeUsuario(Model model, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);
        model.addAttribute("username", user != null ? user.getUsername() : email);
    }

    @GetMapping("/recoverpassword")
    public String recoverpassword(){
        return "recoverpassword";
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
            return "redirect:/loginerror";
        }
        model.addAttribute("token", token);
        return "resetpassword";
    }

    @PostMapping("/resetpassword")
    public String handleResetPassword(@RequestParam("token") String token, @RequestParam("password") String password) {
        boolean success = passwordResetService.resetPassword(token, password);
        return success ? "redirect:/login?reset=true" : "redirect:/loginerror";
    }
}
