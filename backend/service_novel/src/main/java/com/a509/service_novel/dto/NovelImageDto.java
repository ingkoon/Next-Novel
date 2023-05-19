package com.a509.service_novel.dto;

import java.util.List;

import org.springframework.core.io.Resource;

import lombok.Data;

@Data
public class NovelImageDto {

	List<Resource> novelContentImages;

	List<Resource> novelCoverImages;

	List<Resource> novelStartImages;
}
