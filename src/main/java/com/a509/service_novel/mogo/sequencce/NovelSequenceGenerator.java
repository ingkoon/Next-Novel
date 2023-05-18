package com.a509.service_novel.mogo.sequencce;


import org.springframework.stereotype.Component;

import com.a509.service_novel.mogo.sequencce.NovelLikeSequenceRepository;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class NovelSequenceGenerator {
	private NovelLikeSequenceRepository novelLikeSequenceRepository;


	public int generateSequence(int sequenceId) {
		NovelLikeSequence sequence = novelLikeSequenceRepository.findSequenceById(sequenceId);
		if (sequence == null) {
			sequence = NovelLikeSequence.builder().build();
			sequence.setId(sequenceId);
			sequence.setNovelLikeId(1);
			novelLikeSequenceRepository.save(sequence);
		} else {
			sequence.setNovelLikeId(sequence.getNovelLikeId() + 1);
			novelLikeSequenceRepository.save(sequence);
		}
		return sequence.getNovelLikeId();
	}
}