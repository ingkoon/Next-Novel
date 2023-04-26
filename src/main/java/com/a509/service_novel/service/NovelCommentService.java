package com.a509.service_novel.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.a509.service_novel.dto.NovelCommentDto;
import com.a509.service_novel.jpa.novelComment.NovelComment;
import com.a509.service_novel.jpa.novelComment.NovelCommentRepogitory;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NovelCommentService {

	private final NovelCommentRepogitory novelCommentRepogitory;

	@Transactional
	public void insertNovelComment(NovelCommentDto novelCommentDto) throws Exception{
		NovelComment novelComment = novelCommentDto.toEntity();
		novelCommentRepogitory.save(novelComment);
	}
	@Transactional
	public void updateNovelComment(NovelCommentDto novelCommentDto) throws Exception{
		NovelComment novelComment = novelCommentRepogitory.getById(novelCommentDto.getId());
		novelComment.setContent(novelCommentDto.getContent());
		novelCommentRepogitory.save(novelComment);
	}
	@Transactional
	public void deleteNovelComment(int id) throws Exception{
		novelCommentRepogitory.deleteById(id);
	}

}
