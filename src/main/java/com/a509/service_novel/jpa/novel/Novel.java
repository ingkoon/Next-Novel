package com.a509.service_novel.jpa.novel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.a509.service_novel.dto.NovelDetailDto;
import com.a509.service_novel.dto.NovelListDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "novel")
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Novel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String title;
	private String originCoverImg;
	private String coverImg;
	private String introduction;
	private String createdAt;
	private String engGenre;;
	private String korGenre;
	private int authorId;
	private int hitCount;
	private int commentCount;
	private int likeCount;

	private String startImage1;
	private String startImage2;
	private String startImage3;
	private String startImage4;

	private String startContent;
	private String endContent;


	public NovelDetailDto toDto(){
		return NovelDetailDto.builder()
			.id(id)
			.title(title)
			.introduction(introduction)
			.createdAt(createdAt)
			.engGenre(engGenre)
			.korGenre(korGenre)
			.authorId(authorId)
			.hitCount(hitCount)
			.commentCount(commentCount)
			.likeCount(likeCount)
			.startImage1(startImage1)
			.startImage2(startImage2)
			.startImage3(startImage3)
			.startImage4(startImage4)
			.originCoverImg(originCoverImg)
			.coverImg(coverImg)
			.startContent(startContent)
			.endContent(endContent)
			.build();
	}

	public NovelListDto toListDto(){
		return NovelListDto.builder()
			.id(id)
			.title(title)
			.introduction(introduction)
			.authorId(authorId)
			.coverImage(coverImg)
			.hitCount(hitCount)
			.commentCount(commentCount)
			.likeCount(likeCount)
			.build();
	}
}
