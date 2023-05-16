package com.a509.service_novel.mogo;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Document(collection = "novel_like")
@Builder
public class NovelLike {

	private int id;
	private int novelId;
	private long memberId;


}
