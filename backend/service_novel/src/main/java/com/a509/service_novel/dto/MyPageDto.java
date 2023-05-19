package com.a509.service_novel.dto;

import java.util.List;

import lombok.Data;

@Data
public class MyPageDto {

	private List<NovelListDto> novelLikes;
	private List<NovelListDto> novelWritten;
	private MemberMyPageResponseDto profile;
}
