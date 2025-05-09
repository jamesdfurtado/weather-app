package com.example.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

public class DotenvInitializer implements ApplicationListener<ApplicationEnvironmentPreparedEvent> {
    @Override
    public void onApplicationEvent(ApplicationEnvironmentPreparedEvent event) {
        Dotenv dotenv = Dotenv.load();

        Map<String, Object> envVars = new HashMap<>();
        envVars.put("DB_USER", dotenv.get("DB_USER"));
        envVars.put("DB_PASSWORD", dotenv.get("DB_PASSWORD"));

        ConfigurableEnvironment env = event.getEnvironment();
        env.getPropertySources().addFirst(new MapPropertySource("dotenv", envVars));
    }
}
