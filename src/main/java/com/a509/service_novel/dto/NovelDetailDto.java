package com.example.novel.dto;

import java.util.List;

import org.springframework.data.redis.core.RedisHash;

import com.example.novel.jpa.novel.Novel;
import com.example.novel.jpa.novelComment.NovelComment;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@RedisHash(value = "novel_content", timeToLive = 3000)
public class NovelDetailDto {

	private int id;
	private String title;
	private String originCoverImg;
	private String coverImg;
	private String introduction;
	private String createdAt;
	private int genre;
	private int authorId;
	private List<NovelContentDto> contents;
	private List<NovelCommentDto> comment;
	private int hitCount;
	private int commentCount;
	private int likeCount;

	private String startImage1;
	private String startImage2;
	private String startImage3;
	private String startImage4;


	public Novel toEntityNovel() {
		return Novel.builder()
			.title(title)
			.originCoverImg(originCoverImg)
			.coverImg(coverImg)
			.introduction(introduction)
			.genre(genre)
			.authorId(authorId)
			.build();
	}
}
