package com.a509.service_novel.mogo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface NovelLikeRepository extends MongoRepository<NovelLike, Integer> {

	Optional<NovelLike> findByNovelIdAndNickName(Integer novelId, String nickName);
	List<NovelLike> findAllByNickName(String nickName);
	void deleteByNovelIdAndNickName(Integer novelId, String nickName);
}
