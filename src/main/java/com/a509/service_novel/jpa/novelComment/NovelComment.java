package com.a509.service_novel.jpa.novelComment;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.a509.service_novel.dto.NovelCommentDto;

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

	@Builder.Default
	private String createdAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy_MM_dd_HH_mm_ss"));
	private long memberId;
	private String nickName;
	private int novelId;

	public NovelCommentDto toDto(){
		return NovelCommentDto.builder()
			.commentId(id)
			.content(content)
			.memberId(memberId)
			.nickName(nickName)
			.createdAt(createdAt)
			.novelId(novelId)
			.build();
	}


}
