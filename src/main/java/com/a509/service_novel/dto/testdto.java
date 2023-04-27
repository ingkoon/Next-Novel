package com.a509.service_novel.dto;

import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "dialog_history", timeToLive = 3000)
public class testdto {
	@Id
	private String id = UUID.randomUUID().toString();
	private List<Object> string;
}
