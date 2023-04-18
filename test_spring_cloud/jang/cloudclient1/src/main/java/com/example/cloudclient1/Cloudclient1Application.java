package com.example.cloudclient1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class Cloudclient1Application {

	public static void main(String[] args) {
		SpringApplication.run(Cloudclient1Application.class, args);
	}

}
