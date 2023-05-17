package com.a509.service_novel.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import com.a509.service_novel.component.MemberClientComponent;
import com.a509.service_novel.dto.NovelInsertResponseDto;
import com.a509.service_novel.dto.NovelListDto;
import com.a509.service_novel.redis.DialogHistory;
import com.a509.service_novel.redis.DialogHistoryRepository;
import com.a509.service_novel.component.NovelImageComponent;

import com.a509.service_novel.dto.NovelDetailDto;
import com.a509.service_novel.service.NovelLikeService;
import com.a509.service_novel.service.NovelService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/novel")
@RequiredArgsConstructor
public class NovelController {

	private final NovelService novelService;
	private final NovelImageComponent novelImageComponent;
	private final DialogHistoryRepository dialogHistoryRepository;

	private final NovelLikeService novelLikeService;
	private final MemberClientComponent memberClientComponent;

	private final WebClient webClient = WebClient.builder()
		.exchangeStrategies(ExchangeStrategies.builder()
			.codecs(configurer -> configurer
				.defaultCodecs()
				.maxInMemorySize(-1))
			.build())
		.baseUrl("http://***REMOVED***:8018/search")
		.build();
	@GetMapping("/hello")
	public ResponseEntity<?> hello(){
		return new ResponseEntity<>("hello",HttpStatus.OK);
	}


	@GetMapping("/redis")
	public ResponseEntity<?> helloreids(){
		DialogHistory dialogHistory = new DialogHistory();
		dialogHistoryRepository.save(dialogHistory);
		return new ResponseEntity<>("hello",HttpStatus.OK);
	}

	@PostMapping("/simple")
	public ResponseEntity<?> hello2(@RequestPart("image") MultipartFile image){
		try{
			novelImageComponent.save(image,"uid");
			return ResponseEntity.ok("hello");
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	// -------------------------------------------------

	@PostMapping()
	public ResponseEntity<?> insertNovel(@RequestPart("start_images") MultipartFile[] startImages
		,@RequestPart(name="content_images", required = false) MultipartFile[] contentImages
		,@RequestPart("cover_images") MultipartFile[] coverImages
		,@RequestPart("novel") NovelDetailDto novelDetailDto
		,@RequestHeader("Authorization") final String token){
		try{
			LocalDateTime now = LocalDateTime.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy_MM_dd_HH_mm_ss");
			String UID = now.format(formatter);
			int novelId = novelService.insertNovel(novelDetailDto,startImages,contentImages,coverImages,UID,token);
			System.out.println(novelId);
			novelService.insertNovelImages(novelDetailDto.getMemberId(),startImages,contentImages,UID);
			System.out.println("endendendend");
			NovelInsertResponseDto novelInsertResponseDto = new NovelInsertResponseDto();
			novelInsertResponseDto.setNovelId(novelId);
			System.out.println(novelInsertResponseDto);
			return ResponseEntity.ok(novelInsertResponseDto);
		}
		catch (Exception e){
			System.out.println(e);
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{novelId}")
	public ResponseEntity<?> selectNovel(@PathVariable("novelId") int novelId
										,@RequestParam("memberId") long memberId){

		try{
			System.out.println(novelId +" " + memberId);
			NovelDetailDto novelDetailDto = novelService.selectNovelDetail(novelId, memberId);
			// System.out.println();


			return ResponseEntity.ok().body(novelDetailDto);
		}
		catch (Exception e){
			System.out.println(e.toString());
			return new ResponseEntity<>("SQL 예외 발생", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	///novel?genre=장르&keyword=검색어&page=0&size=10
	@GetMapping()
	public ResponseEntity<?> selectNovels(@RequestParam("genre") String genre,
										  @RequestParam("keyword") String keyword,
										  @RequestParam("page") int page,
										  @RequestParam("size") int size){
		try{
			Pageable pageable = PageRequest.of(page,size);
			return ResponseEntity.ok(novelService.selectNovelList(genre, keyword, pageable));
		}
		catch(Exception e){
			return new ResponseEntity<>("SQL 예외 발생", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/recommend")
	public ResponseEntity<?> selectRecommend(){
		try{
			List<NovelListDto> novelListDtos = novelService.selectNovelRecommend();
			return ResponseEntity.ok(novelListDtos);
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/my/{memberId}")
	public ResponseEntity<?> selectNovelByAuthorId(@PathVariable("memberId") long memberId){
		try{
			//
			// MyPageDto myPageDto = new MyPageDto();
			// myPageDto.setNovelLikes(novelLikes);
			// myPageDto.setNovelWritten(novelWritten);
			// myPageDto.setProfile(memberMyPageResponseDto);
			return ResponseEntity.ok(novelService.selectNovelsByAuthorId(memberId));
		}
		catch(Exception e){
			return new ResponseEntity<>("SQL 예외 발생", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/image/{memberId}")
	public ResponseEntity<?> selectAllNovelImage(@PathVariable("memberId") long memberId){

		try{
			List<String> images = novelService.selectAllNovelImage(memberId);
			return new ResponseEntity<>(images,HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{novelId}")
	public ResponseEntity<?> deleteNovel(@PathVariable("novelId") int novelId){
		try{
			novelService.deleteNovel(novelId);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>("SQL 예외 발생", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/similarity")
	public ResponseEntity<?> selectNovelsBySimilarity(
		@RequestParam("keyword") String keyword){
		try{
			System.out.println(keyword);

			JSONObject body = new JSONObject();
			body.put("query", keyword);
			System.out.println(body);
			Map<String, Object> responseBody = webClient.post()
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.body(BodyInserters.fromValue(body.toString()))
				.retrieve()
				.bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
				.block();
			System.out.println(responseBody);
			// response body = List id, List score;

			List<Integer> ids = (List<Integer>)responseBody.get("id");
			List<Double> scores = (List<Double>)responseBody.get("scores");


			List<NovelListDto> novelListDtos = novelService.selectNovelListBySimilarity(ids,scores);
			return ResponseEntity.ok(novelListDtos);
		}
		catch(Exception e){
			System.out.println(e.toString());
			return new ResponseEntity<>("SQL 예외 발생", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
