package com.a509.service_novel.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;

import javax.servlet.http.HttpServletResponse;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/write")
@RequiredArgsConstructor
public class NovelWriteController {

	@PostMapping("/step/1")
	public void NovelStep1(@RequestParam("image") MultipartFile image, HttpServletResponse response) throws IOException {
		WebClient webClient = WebClient.builder()
			.exchangeStrategies(ExchangeStrategies.builder()
				.codecs(configurer -> configurer
					.defaultCodecs()
					.maxInMemorySize(-1))
				.build())
			.baseUrl("http://j8a502.p.ssafy.io:8001")
			.build();

		MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
		body.add("image", image.getResource());

		String base64ImageData = webClient.post()
			.uri("/novel/image")
			.contentType(MediaType.MULTIPART_FORM_DATA)
			.body(BodyInserters.fromMultipartData(body))
			.retrieve()
			.bodyToMono(String.class)
			.block();

		byte[] imageData = Base64.getDecoder().decode(base64ImageData);
		response.setContentType("image/png"); // MIME 타입 설정
		OutputStream out = response.getOutputStream(); // 출력 스트림 가져오기
		out.write(imageData); // 이미지 데이터 쓰기
		out.flush(); // 스트림 비우기
		out.close(); // 스트림 닫기


		// return responseBody;
	}



}
