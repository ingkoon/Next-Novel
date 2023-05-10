package com.a509.service_novel.mogo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Document(collation = "novel_like")
@Builder
public class NovelLike {

	@Id
	private int id;
	private int novelId;
	private String nickName;

}
