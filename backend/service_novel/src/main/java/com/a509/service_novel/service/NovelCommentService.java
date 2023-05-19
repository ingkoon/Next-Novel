package com.a509.service_novel.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.a509.service_novel.component.MemberClientComponent;
import com.a509.service_novel.dto.NovelCommentDto;
import com.a509.service_novel.jpa.novel.Novel;
import com.a509.service_novel.jpa.novel.NovelRepository;
import com.a509.service_novel.jpa.novelComment.NovelComment;
import com.a509.service_novel.jpa.novelComment.NovelCommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NovelCommentService {

	private final NovelCommentRepository novelCommentRepository;
	private final NovelRepository novelRepository;
	private final MemberClientComponent memberClientComponent;

	@Transactional
	public void insertNovelComment(NovelCommentDto novelCommentDto, String token) throws Exception{
		NovelComment novelComment = novelCommentDto.toEntity();
		String nickName = memberClientComponent.findMyPage(token).getBody().getNickName();
		novelComment.setNickName(nickName);
		novelCommentRepository.save(novelComment);

		Optional<Novel> optional = novelRepository.findById(novelCommentDto.getNovelId());
		if(optional.isPresent()){
			Novel novel = optional.get();
			novel.setCommentCount(novel.getCommentCount()+1);

		}
	}
	@Transactional
	public void updateNovelComment(NovelCommentDto novelCommentDto) throws Exception{
		NovelComment novelComment = novelCommentRepository.getById(novelCommentDto.getCommentId());
		novelComment.setContent(novelCommentDto.getContent());
		novelCommentRepository.save(novelComment);
	}
	@Transactional
	public void deleteNovelComment(int commentId) throws Exception{


		NovelComment novelComment = novelCommentRepository.getById(commentId);
		Optional<Novel> optional = novelRepository.findById(novelComment.getNovelId());
		if(optional.isPresent()){
			Novel novel = optional.get();
			novel.setCommentCount(novel.getCommentCount()-1);

		}
		novelCommentRepository.deleteById(commentId);

	}

}
