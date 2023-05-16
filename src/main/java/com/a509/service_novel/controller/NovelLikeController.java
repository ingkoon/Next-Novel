package com.a509.service_novel.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a509.service_novel.dto.NovelLikeDto;
import com.a509.service_novel.service.NovelLikeService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/novel")
public class NovelLikeController {

	private final NovelLikeService novelLikeService;


	@GetMapping("/like/{memberId}")
	public ResponseEntity<?> selectLikedNovels(@PathVariable("memberId") long memberId){
		try{
			System.out.println(memberId);
			return ResponseEntity.ok(novelLikeService.selectLikedNovelList(memberId));
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/like")
	public ResponseEntity<?> insertLikedNovel(@RequestBody NovelLikeDto novelLikeDto){
		try{
			novelLikeService.insertNovelLike(novelLikeDto);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/like")
	public ResponseEntity<?> deletedLikedNovels(@RequestBody NovelLikeDto novelLikeDto){
		try{
			novelLikeService.deleteNovelLike(novelLikeDto);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>(e.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
