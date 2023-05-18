package com.a509.service_novel.mogo.sequencce;


import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

import com.a509.service_novel.mogo.sequencce.NovelLikeSequenceRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class NovelSequenceGenerator {
	private NovelLikeSequenceRepository novelLikeSequenceRepository;


	@Transactional
	public int generateSequence(long sequenceId) {
		Optional<NovelLikeSequence> optional = novelLikeSequenceRepository.findById(sequenceId);
		if(optional.isPresent()){
			NovelLikeSequence novelLikeSequence = optional.get();
			novelLikeSequence.setNovelLikeId(novelLikeSequence.getNovelLikeId()+1);
			novelLikeSequenceRepository.save(novelLikeSequence);
			return novelLikeSequence.getNovelLikeId();
		}
		else{
			NovelLikeSequence sequence = NovelLikeSequence.builder().build();
			sequence.setId(sequenceId); // sequenceId 값을 _id 필드에 저장
			sequence.setNovelLikeId(1);
			novelLikeSequenceRepository.save(sequence);
			return sequence.getNovelLikeId();
		}
	}

}