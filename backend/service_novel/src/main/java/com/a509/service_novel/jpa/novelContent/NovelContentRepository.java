package com.a509.service_novel.jpa.novelContent;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NovelContentRepository extends JpaRepository<NovelContent,Integer> {

	List<NovelContent> findByNovelId(Integer novelId);
	void deleteByNovelId(Integer novelId);
}
