package com.example.novel.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.novel.dto.NovelCommentDto;
import com.example.novel.jpa.novelComment.NovelComment;
import com.example.novel.jpa.novelComment.NovelCommentRepogitory;

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
