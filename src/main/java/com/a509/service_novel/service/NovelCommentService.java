package com.a509.service_novel.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.a509.service_novel.component.MemberClientComponent;
import com.a509.service_novel.dto.NovelCommentDto;
import com.a509.service_novel.jpa.novelComment.NovelComment;
import com.a509.service_novel.jpa.novelComment.NovelCommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NovelCommentService {

	private final NovelCommentRepository novelCommentRepository;
	private final MemberClientComponent memberClientComponent;

	@Transactional
	public void insertNovelComment(NovelCommentDto novelCommentDto, String token) throws Exception{
		NovelComment novelComment = novelCommentDto.toEntity();
		String nickName = memberClientComponent.findMyPage(token).getBody().getNickName();
		novelComment.setNickName(nickName);
		novelCommentRepository.save(novelComment);
	}
	@Transactional
	public void updateNovelComment(NovelCommentDto novelCommentDto) throws Exception{
		NovelComment novelComment = novelCommentRepository.getById(novelCommentDto.getCommentId());
		novelComment.setContent(novelCommentDto.getContent());
		novelCommentRepository.save(novelComment);
	}
	@Transactional
	public void deleteNovelComment(int commentId) throws Exception{
		novelCommentRepository.deleteById(commentId);
	}

}
