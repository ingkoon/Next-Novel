package com.a509.service_novel.mogo.sequencce;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "novel_like_sequence")
@Builder
public class NovelLikeSequence {

	@Id
	private long id;
	private int novelLikeId;
}
