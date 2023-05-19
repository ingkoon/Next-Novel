package com.a509.service_novel.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

	// private final String path = "file:/C:/Users/SSAFY/Desktop/imagelocation/";
	private final String path = "file:/home/data/";


	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry){

		registry.addResourceHandler("/img/novel/**").addResourceLocations(path);
	}
}
