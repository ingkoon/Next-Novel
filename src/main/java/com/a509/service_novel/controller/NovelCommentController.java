package com.a509.service_novel.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a509.service_novel.component.MemberClientComponent;
import com.a509.service_novel.service.NovelCommentService;
import com.a509.service_novel.dto.NovelCommentDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class NovelCommentController {

	private final NovelCommentService novelCommentService;

	@PostMapping()
	public ResponseEntity<?> insertNovelComment(@RequestBody NovelCommentDto novelCommentDto
												,@RequestHeader("Authorization") final String token) {
		try {
			novelCommentService.insertNovelComment(novelCommentDto,token);
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

	@DeleteMapping("/{commentId}")
	public ResponseEntity<?> updateNovelComment(@PathVariable("commentId") int commentId){
		try{
			novelCommentService.deleteNovelComment(commentId);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e){
			return new ResponseEntity<>("SQL 예외 발생", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
