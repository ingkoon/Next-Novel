package com.a509.service_novel.jpa.novelComment;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NovelCommentRepogitory extends JpaRepository<NovelComment,Integer> {

	List<NovelComment> findAllByNovelId(Integer id);

	Optional<List<NovelComment>> findByNovelId(Integer id);
}
