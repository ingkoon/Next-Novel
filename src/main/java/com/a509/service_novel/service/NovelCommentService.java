package com.a509.service_novel.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.a509.service_novel.dto.NovelCommentDto;
import com.a509.service_novel.jpa.novelComment.NovelComment;
import com.a509.service_novel.jpa.novelComment.NovelCommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NovelCommentService {

	private final NovelCommentRepository novelCommentRepository;

	@Transactional
	public void insertNovelComment(NovelCommentDto novelCommentDto) throws Exception{
		NovelComment novelComment = novelCommentDto.toEntity();
		novelCommentRepository.save(novelComment);
	}
	@Transactional
	public void updateNovelComment(NovelCommentDto novelCommentDto) throws Exception{
		NovelComment novelComment = novelCommentRepository.getById(novelCommentDto.getId());
		novelComment.setContent(novelCommentDto.getContent());
		novelCommentRepository.save(novelComment);
	}
	@Transactional
	public void deleteNovelComment(int id) throws Exception{
		novelCommentRepository.deleteById(id);
	}

}
