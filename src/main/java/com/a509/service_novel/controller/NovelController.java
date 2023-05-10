package com.a509.service_novel.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.a509.service_novel.dto.ImageDto;
import com.a509.service_novel.dto.NovelInsertResponseDto;
import com.a509.service_novel.dto.NovelLikeDto;
import com.a509.service_novel.dto.NovelListDto;
import com.a509.service_novel.service.NovelImageComponent;

import com.a509.service_novel.dto.NovelDetailDto;
import com.a509.service_novel.service.NovelService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/novel")
@RequiredArgsConstructor
public class NovelController {

	private final NovelService novelService;
	private final NovelImageComponent novelImageComponent;
	@GetMapping("/hello")
	public ResponseEntity<?> hello(){
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

	@PostMapping()
	public ResponseEntity<?> insertNovel(@RequestPart("start_images") MultipartFile[] startImages
		,@RequestPart("content_images") MultipartFile[] contentImages
		,@RequestPart("cover_images") MultipartFile[] coverImages
		,@RequestPart("novel") NovelDetailDto novelDetailDto){
		try{
			LocalDateTime now = LocalDateTime.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy_MM_dd_HH_mm_ss");
			String UID = now.format(formatter);
			int novelId = novelService.insertNovel(novelDetailDto,startImages,contentImages,coverImages,UID);
			novelService.insertNovelImages(novelDetailDto.getNickName(),startImages,contentImages,UID);
			System.out.println("endendendend");
			NovelInsertResponseDto novelInsertResponseDto = new NovelInsertResponseDto();
			novelInsertResponseDto.setNovelId(novelId);
			return ResponseEntity.ok(novelInsertResponseDto);
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> selectNovel(@PathVariable("id") int id){

		try{

			NovelDetailDto novelDetailDto = novelService.selectNovelDetail(id);
			// System.out.println();


			return ResponseEntity.ok().body(novelDetailDto);
		}
		catch (Exception e){
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

	@GetMapping("/id/{id}")
	public ResponseEntity<?> selectNovelByAuthorId(@PathVariable("id") String nickName){
		try{
			List<NovelListDto> novelWritten = novelService.selectNovelsByAuthorId(nickName);
			return ResponseEntity.ok(novelService.selectNovelsByAuthorId(nickName));
		}
		catch(Exception e){
			return new ResponseEntity<>("SQL 예외 발생", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/image/{id}")
	public ResponseEntity<?> selectAllNovelImage(@PathVariable("id") String nickName){

		try{
			List<String> images = novelService.selectAllNovelImage(nickName);
			return new ResponseEntity<>(images,HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteNovel(@PathVariable("id") int id){
		try{
			novelService.deleteNovel(id);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>("SQL 예외 발생", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	@GetMapping("/like/{nickName}")
	public ResponseEntity<?> selectLikedNovels(@PathVariable("nickName") String nickName){
		try{
			System.out.println(nickName);
			return ResponseEntity.ok(novelService.selectLikedNovelList(nickName));
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/like")
	public ResponseEntity<?> selectLikedNovels(@RequestBody NovelLikeDto novelLikeDto){
		try{
			novelService.insertNovelLike(novelLikeDto);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/like")
	public ResponseEntity<?> deletedLikedNovels(@RequestBody NovelLikeDto novelLikeDto){
		try{
			novelService.deleteNovelLike(novelLikeDto);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
