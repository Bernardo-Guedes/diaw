package com.example.SecureLoginPUC.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig {

    @Value("${app.user.username}")
    private String userUsername;

    @Value("${app.user.email}")
    private String userEmail;

    @Value("${app.user.password}")
    private String userPassword;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    public String getUserUsername(){
        return userUsername;
    }
    public String getUserEmail(){
        return userEmail;
    }
    public String getUserPassword(){
        return userPassword;
    }
    public String getAdminUsername(){
        return adminUsername;
    }
    public String getAdminEmail(){
        return adminEmail;
    }
    public String getAdminPassword(){
        return adminPassword;
    }

}
