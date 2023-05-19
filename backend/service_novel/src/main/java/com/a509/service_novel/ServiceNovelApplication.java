package com.a509.service_novel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Import;

import com.a509.service_novel.config.WebConfiguration;

@SpringBootApplication
@EnableEurekaClient
@Import(WebConfiguration.class)
@EnableFeignClients
public class ServiceNovelApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceNovelApplication.class, args);
	}

}
