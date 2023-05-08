package com.a509.service_novel.redis.questions;



import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
@RedisHash(value = "question", timeToLive = 3000)
public class Question {

	@Id
	private String nickName;
	private String query1;
	private String query2;
	private String query3;

}
