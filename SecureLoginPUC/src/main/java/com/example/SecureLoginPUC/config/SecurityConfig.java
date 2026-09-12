package com.example.SecureLoginPUC.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, "/login/**").permitAll() // Permitir acesso a GET na URL de login
                        .requestMatchers(HttpMethod.POST, "/login/**").permitAll() // Permitir acesso a POST na URL de login
                        .requestMatchers(HttpMethod.GET, "/css/**").permitAll() // Permitir acesso a arquivos CSS
                        .requestMatchers(HttpMethod.GET, "/images/**").permitAll() // Permitir acesso a arquivos de imagem
                        .requestMatchers(HttpMethod.GET, "/register").permitAll() // Permitir acesso à página de registro
                        .requestMatchers(HttpMethod.POST, "/register").permitAll() // Permitir envio do formulário de registro
                        .requestMatchers(HttpMethod.GET, "/recoverpassword").permitAll() // Permitir acesso à página de recuperação de senha
                        .requestMatchers(HttpMethod.POST, "/recoverpassword").permitAll() // Permitir acesso à página de recuperação de senha
                        .requestMatchers(HttpMethod.GET, "/error").permitAll() // Permitir acesso à página de erro
                        .requestMatchers(HttpMethod.GET, "/resetpassword").permitAll()
                        .requestMatchers(HttpMethod.POST, "/resetpassword").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN") // Proteger URLs que começam com /admin para apenas ADMIN
                        .anyRequest().authenticated() // Proteger todas as outras URLs
                )
                .formLogin(form -> form
                        .loginPage("/login") // Especifica a URL da página de login
                        .usernameParameter("email")
                        .permitAll()
                        //.defaultSuccessUrl("/home", true) // Redireciona após o login com sucesso
                        .successHandler((request, response, authentication) -> {
                            // Verifica se o usuário tem a role ADMIN
                            if (authentication.getAuthorities().stream()
                                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
                                response.sendRedirect("/admin"); // Redireciona para /admin
                            } else {
                                response.sendRedirect("/home"); // Redireciona para /home
                            }
                        })
                        .failureHandler((request, response, authentication) -> {
                            response.sendRedirect("/error"); // Redireciona para /error em caso de falha
                        })
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // Define a URL para logout
                        .logoutSuccessUrl("/login?logout=true") // Redireciona após logout com sucesso
                        .permitAll());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}