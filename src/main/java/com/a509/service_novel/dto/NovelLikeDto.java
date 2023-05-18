package com.a509.service_novel.dto;

import com.a509.service_novel.mogo.NovelLike;
import com.a509.service_novel.mogo.sequencce.NovelSequenceGenerator;

import lombok.Data;

@Data
public class NovelLikeDto {

	private int novelId;
	private long memberId;

	public NovelLike toEntity(NovelSequenceGenerator novelSequenceGenerator){
		return NovelLike.builder()
			.id(novelSequenceGenerator.generateSequence(1))
			.novelId(novelId)
			.memberId(memberId)
			.build();
	}
}
