package com.a509.service_novel.service;

import java.io.File;

import javax.transaction.Transactional;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NovelImageComponent {
	// private final String path = "C:\\Users\\SSAFY\\Desktop\\imagelocation";
	private final String path = "/home/ubuntu/NextNovel/NovelService/images";
	@Transactional
	public void save(MultipartFile file, String UID) throws Exception{

		file.transferTo(new File(path+"/"+UID+"_"+file.getOriginalFilename()));

	}
}
