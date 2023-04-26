package com.example.novel.jpa.novelComment;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.example.novel.dto.NovelCommentDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "novel_comment")
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class NovelComment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String content;
	private String createdAt;
	private int authorId;
	private int novelId;

	public NovelCommentDto toDto(){
		return NovelCommentDto.builder()
			.id(id)
			.content(content)
			.authorId(authorId)
			.createdAt(createdAt)
			.novelId(novelId)
			.build();
	}


}
