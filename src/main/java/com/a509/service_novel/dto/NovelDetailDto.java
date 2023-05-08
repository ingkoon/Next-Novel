package com.a509.service_novel.dto;

import java.util.List;

import org.springframework.data.redis.core.RedisHash;

import com.a509.service_novel.jpa.novel.Novel;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@RedisHash(value = "novel_content", timeToLive = 3000)
public class NovelDetailDto {

	private int id;
	private String title;
	private String introduction;
	private String createdAt;
	private String engGenre;;
	private String korGenre;
	private String nickName;
	private List<NovelContentDto> contents;
	private List<NovelCommentDto> comment;
	private int hitCount;
	private int commentCount;
	private int likeCount;
	private String originCoverImg;
	private String coverImg;
	private String startImage1;
	private String startImage2;
	private String startImage3;
	private String startImage4;
	private String startContent;
	private String endContent;


	public Novel toEntityNovel() {
		return Novel.builder()
			.title(title)
			.introduction(introduction)
			.engGenre(engGenre)
			.korGenre(korGenre)
			.nickName(nickName)
			.startContent(startContent)
			.endContent(endContent)
			.build();
	}
}
