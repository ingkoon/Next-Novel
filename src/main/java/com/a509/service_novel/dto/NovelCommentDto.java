package com.example.novel.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.example.novel.jpa.novelComment.NovelComment;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NovelCommentDto {

	private int id;
	private String content;
	private String createdAt;
	private int authorId;
	private int novelId;

	public NovelComment toEntity(){
		return NovelComment.builder()
			.content(content)
			.authorId(authorId)
			.novelId(novelId)
			.build();
	}
}
