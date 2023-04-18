package com.example.cloudserver1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class Cloudserver1Application {
	public static void main(String[] args) {
		SpringApplication.run(Cloudserver1Application.class, args);
	}
}
