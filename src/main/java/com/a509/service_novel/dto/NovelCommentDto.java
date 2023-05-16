package com.a509.service_novel.dto;

import com.a509.service_novel.jpa.novelComment.NovelComment;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NovelCommentDto {

	private int commentId;
	private String content;
	private String createdAt;
	private long memberId;
	private String nickName;
	private int novelId;
	private String profileImg;

	public NovelComment toEntity(){
		return NovelComment.builder()
			.content(content)
			.memberId(memberId)
			.nickName(nickName)
			.novelId(novelId)
			.build();
	}
}
