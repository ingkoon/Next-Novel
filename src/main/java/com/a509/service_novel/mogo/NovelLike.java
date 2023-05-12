package com.a509.service_novel.mogo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import com.a509.service_novel.mogo.sequencce.NovelSequenceGenerator;

import lombok.Builder;
import lombok.Data;

@Data
@Document(collection = "novel_like")
@Builder
public class NovelLike {

	private int id;
	private int novelId;
	private String nickName;


}
