package com.a509.service_novel.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.a509.service_novel.dto.NovelLikeDto;
import com.a509.service_novel.dto.NovelListDto;
import com.a509.service_novel.jpa.novel.Novel;
import com.a509.service_novel.jpa.novel.NovelRepository;
import com.a509.service_novel.mogo.NovelLike;
import com.a509.service_novel.mogo.NovelLikeRepository;
import com.a509.service_novel.mogo.sequencce.NovelSequenceGenerator;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class NovelLikeService {

	private final NovelLikeRepository novelLikeRepository;
	private final NovelRepository novelRepository;
	private final NovelSequenceGenerator novelSequenceGenerator;

	@Transactional
	public List<NovelListDto> selectLikedNovelList(long memberId) throws Exception{

		List<NovelLike> novelLikes= novelLikeRepository.findAllByMemberId(memberId);
		List<NovelListDto> novelListDtos = new ArrayList<>();

		for(NovelLike novelLike : novelLikes){
			int likeNovelId = novelLike.getNovelId();
			System.out.println(likeNovelId);
			Optional<Novel> optional = novelRepository.findById(likeNovelId);
			if(optional.isPresent()){
				System.out.println(optional.get());
				NovelListDto novelListDto = optional.get().toListDto();
				novelListDtos.add(novelListDto);
			}
		}


		return novelListDtos;
	}

	@Transactional
	public void insertNovelLike(NovelLikeDto novelLikeDto) throws Exception{

		NovelLike novelLike = novelLikeDto.toEntity(novelSequenceGenerator);
		System.out.println(novelLike);
		novelLikeRepository.save(novelLike);


		Optional<Novel> optionalNovel = novelRepository.findById(novelLikeDto.getNovelId());
		if(optionalNovel.isPresent()){
			Novel novel = optionalNovel.get();
			novel.setLikeCount(novel.getLikeCount()+1);
		}
	}

	@Transactional
	public void deleteNovelLike(NovelLikeDto novelLikeDto) throws Exception{
		novelLikeRepository.deleteByNovelIdAndMemberId(novelLikeDto.getNovelId(),novelLikeDto.getMemberId());
		Optional<Novel> optionalNovel = novelRepository.findById(novelLikeDto.getNovelId());
		if(optionalNovel.isPresent()){
			Novel novel = optionalNovel.get();
			novel.setLikeCount(novel.getLikeCount()-1);
		}
	}
}
