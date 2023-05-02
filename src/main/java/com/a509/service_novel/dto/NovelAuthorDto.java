package com.a509.service_novel.dto;

import java.util.List;

import lombok.Data;

@Data
public class NovelAuthorDto {
	private List<NovelListDto> novelsWritten;
	private List<NovelListDto> novelsLiked;

}
