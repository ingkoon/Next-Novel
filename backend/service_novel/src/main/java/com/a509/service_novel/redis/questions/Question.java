package com.a509.service_novel.redis.questions;



import java.util.List;

import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
@RedisHash(value = "question", timeToLive = 3000)
public class Question {

	@Id
	private long memberId;
	private List<String> questions;

}
