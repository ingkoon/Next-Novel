package com.a509.service_novel.mogo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NovelLikeRepository extends MongoRepository<NovelLike, Integer> {

	Optional<NovelLike> findByNovelIdAndMemberId(Integer novelId, Long memberId);
	List<NovelLike> findAllByMemberId(long memberId);
	void deleteByNovelIdAndMemberId(Integer novelId, long memberId);
}
