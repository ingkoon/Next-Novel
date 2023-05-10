package com.a509.service_novel.dto;

import com.a509.service_novel.mogo.NovelLike;

import lombok.Data;

@Data
public class NovelLikeDto {

	private int novelId;
	private String nickName;

	public NovelLike toEntity(){
		return NovelLike.builder()
			.novelId(novelId)
			.nickName(nickName)
			.build();
	}
}
