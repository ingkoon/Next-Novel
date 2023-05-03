package com.a509.service_novel.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a509.service_novel.service.NovelCommentService;
import com.a509.service_novel.dto.NovelCommentDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NovelCommentController {

	private final NovelCommentService novelCommentService;

	@PostMapping()
	public ResponseEntity<?> insertNovelComment(@RequestBody NovelCommentDto novelCommentDto) {
		try {
			novelCommentService.insertNovelComment(novelCommentDto);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>("SQL 예외 발생", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping()
	public ResponseEntity<?> updateNovelComment(@RequestBody NovelCommentDto novelCommentDto){
		try{
			novelCommentService.updateNovelComment(novelCommentDto);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>("SQL 예외 발생", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> updateNovelComment(@PathVariable("id") int id){
		try{
			novelCommentService.deleteNovelComment(id);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>("SQL 예외 발생", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
