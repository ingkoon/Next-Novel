package com.a509.service_novel.jpa.novelImage;

import java.awt.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.a509.service_novel.dto.ImageDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NovelImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String imageName;
	private int authorId;


	public ImageDto toDto(){
		return ImageDto.builder()
			.imageName(imageName)
			.build();
	}
}
