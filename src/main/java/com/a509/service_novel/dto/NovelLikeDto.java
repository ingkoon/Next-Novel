package com.a509.service_novel.dto;

import com.a509.service_novel.mogo.NovelLike;
import com.a509.service_novel.mogo.sequencce.NovelSequenceGenerator;

import lombok.Data;

@Data
public class NovelLikeDto {

	private int novelId;
	private String nickName;

	public NovelLike toEntity(NovelSequenceGenerator novelSequenceGenerator){
		return NovelLike.builder()
			.id(novelSequenceGenerator.generateSequence(0))
			.novelId(novelId)
			.nickName(nickName)
			.build();
	}
}
