package com.a509.service_novel.dto;

import com.a509.service_novel.jpa.novelComment.NovelComment;

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
