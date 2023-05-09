package com.a509.service_novel.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.AllArgsConstructor;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

	private final String path = "/home/data";
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry){

		registry.addResourceHandler("/img/**").addResourceLocations(path);
	}
}
