package com.a509.eureka_api_gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EnableEurekaClient
public class EurekaApiGatewayApplication {
	public static void main(String[] args) {
		SpringApplication.run(EurekaApiGatewayApplication.class, args);
	}
}
