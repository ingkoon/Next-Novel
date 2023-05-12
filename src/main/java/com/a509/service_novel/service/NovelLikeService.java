package com.a509.service_novel.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

	public List<NovelListDto> selectLikedNovelList(String nickName) throws Exception{

		List<NovelLike> novelLikes= novelLikeRepository.findAllByNickName(nickName);
		List<NovelListDto> novelListDtos = new ArrayList<>();

		for(NovelLike novelLike : novelLikes){
			int likeNovelId = novelLike.getNovelId();
			Optional<Novel> optional = novelRepository.findById(likeNovelId);
			if(optional.isPresent()){
				NovelListDto novelListDto = optional.get().toListDto();
				novelListDtos.add(novelListDto);
			}
		}


		return novelListDtos;
	}

	public void insertNovelLike(NovelLikeDto novelLikeDto) throws Exception{

		System.out.println(novelSequenceGenerator.generateSequence(0));
		Optional<NovelLike> optional = novelLikeRepository.findByNovelIdAndNickName(novelLikeDto.getNovelId(),novelLikeDto.getNickName());
		if(optional.isPresent())
			return;

		NovelLike novelLike = novelLikeDto.toEntity(novelSequenceGenerator);
		System.out.println(novelLike);
		novelLikeRepository.save(novelLike);


		Optional<Novel> optionalNovel = novelRepository.findById(novelLikeDto.getNovelId());
		if(optionalNovel.isPresent()){
			Novel novel = optionalNovel.get();
			novel.setLikeCount(novel.getLikeCount()+1);
		}
	}

	public void deleteNovelLike(NovelLikeDto novelLikeDto) throws Exception{
		novelLikeRepository.deleteByNovelIdAndNickName(novelLikeDto.getNovelId(),novelLikeDto.getNickName());
		Optional<Novel> optionalNovel = novelRepository.findById(novelLikeDto.getNovelId());
		if(optionalNovel.isPresent()){
			Novel novel = optionalNovel.get();
			novel.setLikeCount(novel.getLikeCount()-1);
		}
	}
}
