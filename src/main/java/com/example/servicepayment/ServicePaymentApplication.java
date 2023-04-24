package com.example.servicepayment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ServicePaymentApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServicePaymentApplication.class, args);
	}

}
