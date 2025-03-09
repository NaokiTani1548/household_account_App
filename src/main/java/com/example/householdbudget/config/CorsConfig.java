package com.example.householdbudget.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // すべてのエンドポイントに適用
                        .allowedOrigins("http://localhost:3000") // フロントエンドのURLを許可
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 許可するHTTPメソッド
                        .allowedHeaders("*") // すべてのヘッダーを許可
                        .allowCredentials(true); // クッキーや認証情報を許可
            }
        };
    }
}
