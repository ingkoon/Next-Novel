package com.a509.service_novel.jpa.novelImage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NovelImageRepository extends JpaRepository<NovelImage, Integer> {
	List<NovelImage> findByAuthorId(String nickName);
}
