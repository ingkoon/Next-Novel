package com.a509.service_novel.mogo.sequencce;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NovelLikeSequenceRepository extends MongoRepository<NovelLikeSequence, Long> {
	NovelLikeSequence findSequenceById(Integer id);
}