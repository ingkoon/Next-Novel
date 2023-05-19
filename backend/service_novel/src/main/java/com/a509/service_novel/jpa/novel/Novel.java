package com.a509.service_novel.jpa.novel;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.a509.service_novel.dto.ImageDto;
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



	@Builder.Default
	private String createdAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy_MM_dd_HH_mm_ss"));
	private String engGenre;;
	private String korGenre;
	private long memberId;
	private String nickName;
	private int hitCount;
	private int commentCount;
	private int likeCount;
	private String startImage1;
	private String startImage2;
	private String startImage3;
	private String startImage4;

	private String imageCaption1;
	private String imageCaption2;
	private String imageCaption3;
	private String imageCaption4;

	private String startContent;
	private String endContent;


	public NovelDetailDto toDto(){
		List<ImageDto> images = new ArrayList<>();
		images.add(new ImageDto(startImage1,imageCaption1));
		images.add(new ImageDto(startImage2,imageCaption2));
		images.add(new ImageDto(startImage3,imageCaption3));
		images.add(new ImageDto(startImage4,imageCaption4));

		return NovelDetailDto.builder()
			.novelId(id)
			.title(title)
			.introduction(introduction)
			.createdAt(createdAt)
			.engGenre(engGenre)
			.korGenre(korGenre)
			.memberId(memberId)
			.nickName(nickName)
			.hitCount(hitCount)
			.commentCount(commentCount)
			.likeCount(likeCount)
			.originCoverImg(originCoverImg)
			.coverImg(coverImg)
			.startImages(images)
			.startContent(startContent)
			.endContent(endContent)
			.build();
	}

	public NovelListDto toListDto(){
		return NovelListDto.builder()
			.novelId(id)
			.title(title)
			.introduction(introduction)
			.memberId(memberId)
			.nickName(nickName)
			.coverImg(coverImg)
			.hitCount(hitCount)
			.commentCount(commentCount)
			.likeCount(likeCount)
			.build();
	}
}
