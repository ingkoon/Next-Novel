package com.a509.service_novel.service;

import java.io.File;
import java.nio.file.Paths;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NovelImageComponent {
	// private final String path = "C:\\Users\\SSAFY\\Desktop\\imagelocation";
	// private final String path = "\\home\\ubuntu\\NextNovel\\NovelService\\images";
	private final String path = "";
	// private final String path = "/app/data";
	@Transactional
	public void save(MultipartFile file, String UID) throws Exception{
		String currentPaht = Paths.get("").toAbsolutePath().toString();
		System.out.println(currentPaht);

		// 저장할 파일 경로를 만듭니다.

		file.transferTo(new File(currentPaht+"\\app\\data\\"+UID+"_"+file.getOriginalFilename()));
	}
}
