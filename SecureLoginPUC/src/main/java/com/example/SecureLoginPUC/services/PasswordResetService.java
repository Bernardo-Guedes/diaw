package com.example.SecureLoginPUC.services;

import com.example.SecureLoginPUC.entities.PasswordResetToken;
import com.example.SecureLoginPUC.entities.User;
import com.example.SecureLoginPUC.repositories.PasswordResetTokenRepository;
import com.example.SecureLoginPUC.repositories.UserRepository;
import com.example.SecureLoginPUC.services.SendEmailService; // ajuste conforme o pacote real
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final SendEmailService sendEmailService;

    private static final int EXPIRATION_MINUTES = 10;
    private static final String APP_BASE_URL = "http://localhost:8080";

    public PasswordResetService(
            UserRepository userRepository,
            PasswordResetTokenRepository tokenRepository,
            PasswordEncoder passwordEncoder,
            SendEmailService sendEmailService
    ) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.sendEmailService = sendEmailService;
    }

    @Transactional
    public void createPasswordResetTokenAndSendEmail(String email) {
        User user = userRepository.findByEmail(email).orElse(null);

        // Não revele se o e-mail existe ou não (evita enumeração de contas)
        if (user == null) {
            System.out.println("DEBUG: usuário não encontrado para o e-mail: " + email);
            return;
        }
        System.out.println("DEBUG: usuário encontrado: " + user.getEmail());

        // Remove tokens antigos desse usuário
        tokenRepository.deleteByUser_Id(user.getId());

        String token = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES);

        PasswordResetToken resetToken = new PasswordResetToken(token, user, expiry);
        tokenRepository.save(resetToken);
        System.out.println("DEBUG: token gerado: " + token);


        String link = APP_BASE_URL + "/resetpassword?token=" + token;
        String body = "Olá " + user.getUsername() + ",\n\n"
                + "Você solicitou a redefinição de senha. Clique no link abaixo (válido por "
                + EXPIRATION_MINUTES + " minutos):\n\n" + link
                + "\n\nSe você não solicitou isso, ignore este e-mail.";

        System.out.println("DEBUG: prestes a enviar e-mail para: " + user.getEmail());
        sendEmailService.sendEmail(user.getEmail(), "Recuperação de senha", body);
        System.out.println("DEBUG: e-mail enviado (sem exceção lançada)");
    }

    public boolean isValidToken(String token) {
        return tokenRepository.findByToken(token)
                .map(t -> !t.isExpired())
                .orElse(false);
    }

    @Transactional
    public boolean resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token).orElse(null);

        if (resetToken == null || resetToken.isExpired()) {
            return false;
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(resetToken); // invalida o token após uso

        return true;
    }
}