package com.example.serviceai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ServiceAiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceAiApplication.class, args);
	}

}
