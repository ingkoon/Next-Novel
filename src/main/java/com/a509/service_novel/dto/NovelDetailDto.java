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

	private int novelId;
	private String title;
	private String introduction;

	private String createdAt;
	private String engGenre;;
	private String korGenre;
	private long memberId;
	private String nickName;
	private List<NovelContentDto> contents;
	private List<NovelCommentDto> comments;
	private int hitCount;
	private int commentCount;
	private int likeCount;
	private String originCoverImg;
	private String coverImg;
	private List<ImageDto> startImages;
	private String startContent;
	private String endContent;
	private boolean isLiked;


	public void setIsLiked(boolean isLiked){
		this.isLiked = isLiked;
	}


	public Novel toEntityNovel() {
		return Novel.builder()
			.title(title)
			.introduction(introduction)
			.engGenre(engGenre)
			.korGenre(korGenre)
			.memberId(memberId)
			.nickName(nickName)
			.startImage1(startImages.get(0).getImageName())
			.startImage2(startImages.get(1).getImageName())
			.startImage3(startImages.get(2).getImageName())
			.startImage4(startImages.get(3).getImageName())
			.imageCaption1(startImages.get(0).getCaption())
			.imageCaption2(startImages.get(1).getCaption())
			.imageCaption3(startImages.get(2).getCaption())
			.imageCaption4(startImages.get(3).getCaption())
			.startContent(startContent)
			.endContent(endContent)
			.build();
	}
}
