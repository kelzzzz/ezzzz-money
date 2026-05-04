package com.CS487.ezzzzmoney_spring_backend;

import com.CS487.ezzzzmoney_spring_backend.models.User;
import com.CS487.ezzzzmoney_spring_backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@SpringBootApplication
public class EzzzzmoneySpringBackendApplication {

	@RequestMapping("/hello")
	String home() {
		return "Hello World!";
	}

	public static void main(String[] args) {
		SpringApplication.run(EzzzzmoneySpringBackendApplication.class, args);
	}

}