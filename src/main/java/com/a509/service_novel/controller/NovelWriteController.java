package com.a509.service_novel.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import com.a509.service_novel.dto.NovelWriteDto;
import com.a509.service_novel.service.NovelWriteService;
// import com.a509.service_novel.service.NovelWriteService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/write")
@RequiredArgsConstructor
@Slf4j
public class NovelWriteController {

	private final NovelWriteService novelWriteService;

	private final WebClient webClient = WebClient.builder()
		.exchangeStrategies(ExchangeStrategies.builder()
			.codecs(configurer -> configurer
				.defaultCodecs()
				.maxInMemorySize(-1))
			.build())
		.baseUrl("http://3.39.88.63:8001")
		.build();

	private final HttpHeaders headerImagePNG = new HttpHeaders();
	@PostMapping("/start")
	public ResponseEntity<?> NovelStart(@RequestParam("images") MultipartFile[] images
		, @RequestParam("genre") String genre
		, @RequestParam("memberId") long memberId) throws IOException {
		MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

		for (MultipartFile image : images) {
			ByteArrayResource resource = new ByteArrayResource(image.getBytes()) {
				@Override
				public String getFilename() {
					return image.getOriginalFilename();
				}
			};
			headerImagePNG.setContentType(MediaType.IMAGE_PNG);
			body.add("images", new HttpEntity<>(resource, headerImagePNG));
		}

		body.add("genre",genre);

		//String 응답 받는 코드
		Map<String,Object>responseBody = webClient.post()
			.uri("/novel/start")
			.contentType(MediaType.MULTIPART_FORM_DATA)
			.body(BodyInserters.fromMultipartData(body))
			.retrieve()
			.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {})
			.block();

		log.info("complete start");
		List<Object> dialogHistoryObject = (List<Object>)responseBody.get("dialog_history");
		List<String> captions = (List<String>)responseBody.get("caption");
		String koreanAnswer = (String)responseBody.get("korean_answer");
		log.info(dialogHistoryObject.toString());
		//-----------------------start complete--------------------------------------------------

		//----------------------question start---------------------------

		NovelWriteDto novelWriteDto = new NovelWriteDto();
		novelWriteDto.setCaptions(captions);
		novelWriteDto.setKorean_answer(koreanAnswer);

		log.info("start save in redis");
		try{
			novelWriteService.setDialogHistory(dialogHistoryObject,memberId);

			getQuestions(memberId);
			return new ResponseEntity<>(novelWriteDto,HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/question")
	public ResponseEntity<?> NovelStep3(@RequestParam("memberId") long memberId) {
		try {
			return new ResponseEntity<>(novelWriteService.getQuestion(memberId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	@PostMapping("/sequence")
	public ResponseEntity<?> NovelStep4(@RequestParam("image") MultipartFile image
										,@RequestParam("previousQuestion") String previousQuestion
										,@RequestParam("memberId") long memberId) throws IOException {
		try {
			MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
			ByteArrayResource resource = new ByteArrayResource(image.getBytes()) {
				@Override
				public String getFilename() {
					return image.getOriginalFilename();
				}
			};
			headerImagePNG.setContentType(MediaType.MULTIPART_FORM_DATA);
			List<Object> dialogHistory = novelWriteService.getDialogHistory(memberId);

			body.add("image", new HttpEntity<>(resource, headerImagePNG));
			body.add("previous_question",previousQuestion);
			body.add("dialog_history",dialogHistory);
			log.info(dialogHistory.toString());
			log.info(previousQuestion);
			Map<String, Object> responseBody = webClient.post()
				.uri("/novel/sequence")
				.contentType(MediaType.MULTIPART_FORM_DATA)
				.body(BodyInserters.fromMultipartData(body))
				.retrieve()
				.bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
				})
				.block();

			log.info("sequence complete");
			List<Object> dialogHistoryObject = (List<Object>)responseBody.get("dialog_history");
			String caption = (String)responseBody.get("caption");
			List<String> captions = new ArrayList<>();
			captions.add(caption);
			String koreanAnswer = (String)responseBody.get("korean_answer");
			log.info("sequence complete");
			///---------------------sequence complete-----------------------------

			NovelWriteDto novelWriteDto = new NovelWriteDto();
			novelWriteDto.setCaptions(captions);
			novelWriteDto.setKorean_answer(koreanAnswer);
			novelWriteService.setDialogHistory(dialogHistoryObject, memberId);

			getQuestions(memberId);
			return new ResponseEntity<>(novelWriteDto, HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@PostMapping("/end")
	public ResponseEntity<?> NovelEnd(@RequestParam("memberId") long memberId){

		try {
			MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

			List<Object> dialogHistory = novelWriteService.getDialogHistory(memberId);
			body.add("dialog_history",dialogHistory);

			Map<String, Object> responseBody = webClient.post()
				.uri("/novel/end")
				.contentType(MediaType.MULTIPART_FORM_DATA)
				.body(BodyInserters.fromMultipartData(body))
				.retrieve()
				.bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
				.block();

			String koreanAnswer = (String)responseBody.get("korean_answer");
			NovelWriteDto novelWriteDto = new NovelWriteDto();
			novelWriteDto.setKorean_answer(koreanAnswer);
			return new ResponseEntity<>(novelWriteDto,HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/image")
	public ResponseEntity<?> NovelImage(@RequestParam("image") MultipartFile image) throws IOException {
		MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

		ByteArrayResource resource = new ByteArrayResource(image.getBytes()) {
			@Override
			public String getFilename() {
				return image.getOriginalFilename();
			}
		};

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);
		HttpEntity<ByteArrayResource> httpEntity = new HttpEntity<>(resource, headers);


		body.add("image", httpEntity);
		byte[] imgBytes = webClient.post()
			.uri("/novel/image")
			.contentType(MediaType.MULTIPART_FORM_DATA)
			.body(BodyInserters.fromMultipartData(body))
			.retrieve()
			.bodyToMono(byte[].class)
			.block();

		InputStreamResource resources = new InputStreamResource(new ByteArrayInputStream(imgBytes));

		return ResponseEntity.ok()
			.contentType(MediaType.IMAGE_PNG)
			.body(resources);
	}

	public void getQuestions(long memberId) throws Exception{

		MultiValueMap<String, Object> body;
		body = new LinkedMultiValueMap<>();

		List<Object> dialogHistory = novelWriteService.getDialogHistory(memberId);
		body.add("dialog_history",dialogHistory);
		Map<String,Object> responseBody = webClient.post()
			.uri("/novel/question")
			.contentType(MediaType.MULTIPART_FORM_DATA)
			.body(BodyInserters.fromMultipartData(body))
			.retrieve()
			.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {})
			.block();

		dialogHistory = (List<Object>)responseBody.get("dialog_history");
		String query1 = (String)responseBody.get("query1");
		String query2 = (String)responseBody.get("query2");
		String query3 = (String)responseBody.get("query3");
		List<String> questions = new ArrayList<>();

		questions.add(query1);
		questions.add(query2);
		questions.add(query3);
		log.info("start save in redis");

		novelWriteService.setDialogHistory(dialogHistory,memberId);
		novelWriteService.setQuestion(questions,memberId);

	}

}
