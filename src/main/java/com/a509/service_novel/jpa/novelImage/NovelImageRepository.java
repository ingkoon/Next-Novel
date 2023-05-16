package com.a509.service_novel.jpa.novelImage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NovelImageRepository extends JpaRepository<NovelImage, Integer> {
	List<NovelImage> findByMemberId(long memberId);
}

