package com.a509.eureka_api_gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.web.server.SecurityWebFilterChain;


@SpringBootApplication
@EnableEurekaClient
public class EurekaApiGatewayApplication {
	public static void main(String[] args) {
		SpringApplication.run(EurekaApiGatewayApplication.class, args);
	}

	@Bean
	public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity security){
		return security.csrf().disable().build();
	}

}
