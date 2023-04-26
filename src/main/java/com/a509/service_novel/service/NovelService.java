package com.a509.service_novel.service;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.a509.service_novel.dto.NovelContentDto;
import com.a509.service_novel.dto.NovelDetailDto;
import com.a509.service_novel.jpa.novel.Novel;
import com.a509.service_novel.jpa.novelComment.NovelComment;
import com.a509.service_novel.jpa.novelComment.NovelCommentRepogitory;
import com.a509.service_novel.jpa.novelContent.NovelContent;
import com.a509.service_novel.jpa.novelContent.NovelContentRepogitory;
import com.a509.service_novel.dto.NovelCommentDto;
import com.a509.service_novel.dto.NovelListDto;
import com.a509.service_novel.jpa.novel.NovelRepogitory;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NovelService {

	private final NovelRepogitory novelRepogitory;
	private final NovelContentRepogitory novelContentRepogitory;
	private final NovelCommentRepogitory novelCommentRepogitory;
	@Transactional
	public void insertNovel(NovelDetailDto novelDetailDto) throws Exception{

		List<NovelContentDto> novelContentDtos = novelDetailDto.getContents();
		System.out.println("start save content");
		for(NovelContentDto novelContentDto : novelContentDtos){
			NovelContent novelContent = novelContentDto.toEntity();
			novelContentRepogitory.save(novelContent);
		}
		System.out.println("end save content");
		Novel novel = novelDetailDto.toEntityNovel();
		novelRepogitory.save(novel);
	}

	@Transactional
	public NovelDetailDto selectNovelDetail(int id) throws Exception{

		///소설 찾기
		Novel novel = novelRepogitory.getById(id);
		//소설의 내용 찾기
		List<NovelContent> contents = novelContentRepogitory.findByNovelId(id);
		List<NovelContentDto> contentsDto = new ArrayList<>();

		///소설 댓글 찾기
		Optional<List<NovelComment>> optionalComments = novelCommentRepogitory.findByNovelId(id);
		List<NovelComment> comments = null;

		if (optionalComments.isPresent()) {
			comments = optionalComments.get();
		}

		List<NovelCommentDto> commentDtos = new ArrayList<>();

		for(NovelContent content : contents){
			NovelContentDto novelContent = content.toDto();
			contentsDto.add(novelContent);
		}

		for(NovelComment comment: comments){
			NovelCommentDto novelCommentDto = comment.toDto();
			commentDtos.add(novelCommentDto);
		}


		//찾은 소설 dto전환
		NovelDetailDto novelDetailDto = novel.toDto();
		//novelDto에 저장
		novelDetailDto.setContents(contentsDto);
		//찾은 코멘트 dto 저장
		novelDetailDto.setComment(commentDtos);

		return novelDetailDto;
	}

	@Transactional
	public List<NovelListDto> selectNovelList() throws Exception{
		Sort sortByCreatedAt = Sort.by("createdAt").ascending();

		try {
			List<Novel> novels = novelRepogitory.findAll(sortByCreatedAt);
			List<NovelListDto> novelDtos = new ArrayList<>();

			for (Novel novel : novels) {
				NovelListDto novelDto = novel.toListDto();
				novelDtos.add(novelDto);
			}

			return novelDtos;
		}
		catch (NoSuchElementException e){
			return null;
		}
	}

	@Transactional
	public void deleteNovel(int id) throws Exception{
		List<NovelContent> contents = novelContentRepogitory.findByNovelId(id);
		for(NovelContent content : contents){
			novelContentRepogitory.deleteByNovelId(id);
		}
		novelRepogitory.deleteById(id);
	}
}
