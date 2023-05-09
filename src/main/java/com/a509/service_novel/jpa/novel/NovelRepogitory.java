package com.a509.service_novel.jpa.novel;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NovelRepogitory extends JpaRepository<Novel, Integer> {
	List<Novel> findAllByNickNameOrderByCreatedAtDesc(String nickName);
	List<Novel> findAllByEngGenreAndTitleContainingOrderByIdDesc(String Genre, String keyword, Pageable pageable);
	List<Novel> findAllByTitleContainingOrderByIdDesc(String keyword, Pageable pageable);
	@Query(value = "SELECT * FROM novel ORDER BY RAND() LIMIT 5", nativeQuery = true)
	List<Novel> findRandom5();
}
