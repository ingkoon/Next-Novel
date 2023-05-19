package com.a509.service_novel.dto;

import org.springframework.core.io.Resource;
import org.springframework.data.redis.core.RedisHash;

import com.a509.service_novel.jpa.novelContent.NovelContent;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@RedisHash(value = "novel_content", timeToLive = 3000)
public class NovelContentDto {
	private int novelId;
	private String content;
	private String query;
	private String image;
	private String caption;

	public NovelContent toEntity(){
		return NovelContent.builder()
			.novelId(novelId)
			.content(content)
			.query(query)
			.caption(caption)
			.build();
	}
}
