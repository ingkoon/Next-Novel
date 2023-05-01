package com.a509.service_novel.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NovelImageComponent {



	private final String path = "C:\\Users\\SSAFY\\Desktop\\imagelocation";
	// private final String path = "/home/ubuntu/NovelService/images";
	@Transactional
	public void save(MultipartFile file, String UID) throws Exception{

		file.transferTo(new File(path+"/"+UID+"_"+file.getOriginalFilename()));

	}

	@Transactional
	public List<Resource> findImages(List<String> imageNames) {

		List<Resource> images = new ArrayList<>();
		for(String imageName : imageNames){

			Resource resource = new FileSystemResource(imageName);
			images.add(resource);
		}
		return images;
	}

	@Transactional
	public Resource findImage(String imageName) throws Exception{
		Resource resource = new FileSystemResource(imageName);
		return resource;
	}

	// @Transactional
	// public int update(int id, MultipartFile file) {
	// 	BoardFile boardfile = boardFileRepository.findById(id);
	// 	if(boardfile != null) {
	// 		String name = boardfile.getName();
	// 		File deleteFile = new File(path + "/" + name);
	// 		if (deleteFile.exists()) {
	// 			deleteFile.delete();
	// 		}
	// 		boardfile.update(file.getName());
	// 	}
	//
	// 	else{
	// 		int res = boardFileRepository.save(boardfile).getId();
	// 		try {
	// 			file.transferTo(new File(path+"/"+file.getOriginalFilename()));
	// 		} catch (IOException e) {
	// 			System.out.println(e);
	// 			throw new RuntimeException(e);
	// 		}
	// 	}
	//
	//
	// 	return;
	//
	// }
}
