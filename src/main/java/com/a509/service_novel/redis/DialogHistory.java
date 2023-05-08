package com.a509.service_novel.redis;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.Data;

@Data
@RedisHash(value = "dialog_history", timeToLive = 3000)
public class DialogHistory implements Serializable{

	@Id
	private String nickName;

	private List<Dialog> dialog;

}


