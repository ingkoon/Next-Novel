package com.a509.service_novel.jpa.novelComment;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NovelCommentRepository extends JpaRepository<NovelComment,Integer> {


	Optional<List<NovelComment>> findByNovelId(Integer novelId);
}
