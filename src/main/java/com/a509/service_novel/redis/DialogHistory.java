package com.a509.service_novel.redis;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import com.a509.service_novel.dto.Dialog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@RedisHash(value = "dialog_history", timeToLive = 3000)
public class DialogHistory{

	@Id
	private String id = UUID.randomUUID().toString();
	@Indexed
	private int authorId;

	private Object dialogHistory;

}
