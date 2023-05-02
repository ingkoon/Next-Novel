package com.a509.service_novel.dto;

import java.util.List;

import lombok.Data;

@Data
public class NovelWriteDto {

	private List<String> captions;
	private String korean_answer;
	private List<String> questions;
}
