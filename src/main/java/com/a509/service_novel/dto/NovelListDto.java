package com.a509.service_novel.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NovelListDto {

	private int id;
	private String title;
	private String introduction;
	private String nickName;
	private String coverImg;
	private int hitCount;
	private int commentCount;
	private int likeCount;
	private Double score;

}
