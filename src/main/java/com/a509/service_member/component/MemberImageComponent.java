package com.a509.service_member.component;

import java.io.File;

import javax.transaction.Transactional;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MemberImageComponent {
	// private final String path = "C:\\Users\\SSAFY\\Desktop\\imagelocation";
	private final String path = "/home/data";
	@Transactional
	public void save(MultipartFile file, String UID) throws Exception{

		// 저장할 파일 경로를 만듭니다.

		file.transferTo(new File(path+"/"+UID+"_"+file.getOriginalFilename()));
	}
}
