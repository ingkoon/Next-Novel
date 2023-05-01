package com.a509.service_novel.redis;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import lombok.Data;

@Data
@RedisHash(value = "dialog_history", timeToLive = 3000)
public class DialogHistory implements Serializable{

	@Id
	private int Id;

	private List<Dialog> dialog;

}


