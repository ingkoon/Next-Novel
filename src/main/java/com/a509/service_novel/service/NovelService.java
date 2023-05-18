package com.a509.service_novel.service;

import javax.transaction.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.a509.service_novel.component.MemberClientComponent;
import com.a509.service_novel.component.NovelImageComponent;
import com.a509.service_novel.dto.NovelContentDto;
import com.a509.service_novel.dto.NovelDetailDto;
import com.a509.service_novel.jpa.novel.Novel;
import com.a509.service_novel.jpa.novelComment.NovelComment;
import com.a509.service_novel.jpa.novelComment.NovelCommentRepository;
import com.a509.service_novel.jpa.novelContent.NovelContent;
import com.a509.service_novel.jpa.novelContent.NovelContentRepository;
import com.a509.service_novel.dto.NovelCommentDto;
import com.a509.service_novel.dto.NovelListDto;
import com.a509.service_novel.jpa.novel.NovelRepository;
import com.a509.service_novel.jpa.novelImage.NovelImage;
import com.a509.service_novel.jpa.novelImage.NovelImageRepository;
import com.a509.service_novel.mogo.NovelLike;
import com.a509.service_novel.mogo.NovelLikeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NovelService {

	private final NovelRepository novelRepository;
	private final NovelContentRepository novelContentRepository;
	private final NovelCommentRepository novelCommentRepository;
	private final NovelImageRepository novelImageRepository;

	private final NovelImageComponent novelImageComponent;
	private final NovelLikeRepository novelLikeRepository;

	private final MemberClientComponent memberClientComponent;
	private final String path = "/home/data";
	// private final String path = "C:\\Users\\SSAFY\\Desktop\\imagelocation";
	@Transactional
	public int insertNovel(NovelDetailDto novelDetailDto
		,MultipartFile[] startImages
		,MultipartFile[] contentImages
		,MultipartFile[] coverImages
		,String UID
		,String token) throws Exception{

		List<NovelContentDto> novelContentDtos = novelDetailDto.getContents();
		System.out.println("start save content");

		Novel novel = novelDetailDto.toEntityNovel();
		String nickName = memberClientComponent.findMyPage(token).getBody().getNickName();
		novel.setNickName(nickName);
		novelRepository.save(novel);

		

		if(!(novelContentDtos == null)){
		//content 저장
			for(int i = 0; i < novelContentDtos.size(); i++){

				NovelContentDto novelContentDto = novelContentDtos.get(i);

				String imageName = UID+"_"+contentImages[i].getOriginalFilename();
				NovelContent novelContent = novelContentDto.toEntity();
				novelContent.setImage(imageName);
				novelContent.setNovelId(novel.getId());

				System.out.println(novelContent);
				novelImageComponent.save(contentImages[i],UID);
				novelContentRepository.save(novelContent);
			}
		}
		System.out.println("end save content");

		//시작 이미지 저장
		novel.setStartImage1(UID+"_"+startImages[0].getOriginalFilename());
		novel.setStartImage2(UID+"_"+startImages[1].getOriginalFilename());
		novel.setStartImage3(UID+"_"+startImages[2].getOriginalFilename());
		novel.setStartImage4(UID+"_"+startImages[3].getOriginalFilename());

		novelImageComponent.save(startImages[0],UID);
		novelImageComponent.save(startImages[1],UID);
		novelImageComponent.save(startImages[2],UID);
		novelImageComponent.save(startImages[3],UID);

		//cover
		novel.setCoverImg(UID+"_"+coverImages[0].getOriginalFilename());
		novel.setOriginCoverImg(UID+"_"+coverImages[1].getOriginalFilename());

		novelImageComponent.save(coverImages[0],UID);
		novelImageComponent.save(coverImages[1],UID);
		System.out.println("insert novel end");

		return novel.getId();
	}

	@Transactional
	public NovelDetailDto selectNovelDetail(int novelId, long memberId) throws Exception{

		///소설 찾기
		Novel novel = novelRepository.getById(novelId);
		novel.setHitCount(novel.getHitCount()+1);
		System.out.println("found novel");
		System.out.println(novel);
		//소설의 내용 찾기
		List<NovelContent> contents = novelContentRepository.findByNovelId(novelId);
		System.out.println("found contents");
		System.out.println(contents);
		List<NovelContentDto> novelContentDtos = new ArrayList<>();

		///소설 댓글 찾기
		Optional<List<NovelComment>> optionalComments = novelCommentRepository.findByNovelId(novelId);
		List<NovelComment> comments = new ArrayList<>();
		List<NovelCommentDto> commentDtos = new ArrayList<>();

		if (optionalComments.isPresent()) {
			comments = optionalComments.get();
			System.out.println("found comment");
			System.out.println(comments);
		}

		//소설 내용 저장
		for(NovelContent content : contents){

			NovelContentDto novelContentDto = content.toDto();

			System.out.println("novel is ");
			System.out.println(novelContentDto);
			novelContentDtos.add(novelContentDto);
		}
		for(NovelComment comment: comments){
			NovelCommentDto novelCommentDto = comment.toDto();
			commentDtos.add(novelCommentDto);
			novelCommentDto.setProfileImg(memberClientComponent.findMyPageImage(novelCommentDto.getMemberId()));
		}

		//찾은 소설 dto전환
		NovelDetailDto novelDetailDto = novel.toDto();

		//novelDto에 저장
		novelDetailDto.setContents(novelContentDtos);
		//찾은 코멘트 dto 저장
		novelDetailDto.setComments(commentDtos);

		Optional<NovelLike> novelLike = novelLikeRepository.findByNovelIdAndMemberId(novelId,memberId);
		if(novelLike.isPresent())
			novelDetailDto.setIsLiked(true);
		else
			novelDetailDto.setIsLiked(false);

		return novelDetailDto;
	}

	@Transactional
	public List<NovelListDto> selectNovelList(String genre, String keyword, Pageable pageable) throws Exception{

		try {

			List<Novel> novels = new ArrayList<>();
			if(genre.equals("all")){
				novels = novelRepository.findAllByTitleContainingOrderByIdDesc(keyword,pageable);
			}
			else{
				novels = novelRepository.findAllByEngGenreAndTitleContainingOrderByIdDesc(genre,keyword,pageable);
			}
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
	public List<NovelListDto> selectNovelsByAuthorId(long memberId) throws Exception{

		Sort sortByCreatedAt = Sort.by("createdAt").ascending();

		List<Novel> novels = novelRepository.findAllByMemberIdOrderByCreatedAtDesc(memberId);
		List<NovelListDto> novelDtos = new ArrayList<>();

		for (Novel novel : novels) {
			NovelListDto novelDto = novel.toListDto();
			novelDtos.add(novelDto);
		}

		return novelDtos;
	}

	@Transactional
	public void deleteNovel(int id) throws Exception{
		List<NovelContent> contents = novelContentRepository.findByNovelId(id);
		for(NovelContent content : contents){
			novelContentRepository.deleteByNovelId(id);
		}
		novelRepository.deleteById(id);
	}

	@Transactional
	public void insertNovelImages(long memberId, MultipartFile[] startImages, MultipartFile[] contentImages,String UID) throws Exception{

		for(MultipartFile image : startImages){

			NovelImage novelImage = new NovelImage();
			novelImage.setImageName(UID+"_"+image.getOriginalFilename());
			novelImage.setMemberId(memberId);
			novelImageRepository.save(novelImage);
		}


		if(contentImages != null){
			for(MultipartFile image : contentImages){

				NovelImage novelImage = new NovelImage();
				novelImage.setImageName(UID+"_"+image.getOriginalFilename());
				novelImage.setMemberId(memberId);
				novelImageRepository.save(novelImage);
			}
		}
		System.out.println("insert image end");
	}

	@Transactional
	public List<String> selectAllNovelImage(long memberId) throws Exception{
		List<NovelImage> novelImageList = novelImageRepository.findByMemberId(memberId);
		List<String> images = new ArrayList<>();
		for(NovelImage novelImage : novelImageList){
			String novelPath = path+"/"+novelImage.getImageName();
			File imageFile = new File(novelPath);
			FileInputStream imageInputStream = new FileInputStream(imageFile);
			byte[] imageBytes = new byte[(int) imageFile.length()];
			imageInputStream.read(imageBytes);
			String encodedString = Base64.getEncoder().encodeToString(imageBytes);

			images.add(encodedString);

		}
		return images;
	}

	@Transactional
	public List<NovelListDto> selectNovelRecommend() throws Exception{

		List<Novel> novels = novelRepository.findRandom5();
		List<NovelListDto> novelDtos = new ArrayList<>();

		for (Novel novel : novels) {
			NovelListDto novelDto = novel.toListDto();
			novelDtos.add(novelDto);
		}

		return novelDtos;

	}

	public List<NovelListDto> selectNovelListBySimilarity(List<Integer> ids, List<Double> scores) {
		List<NovelListDto> novelListDtos = new ArrayList<>();
		for(int i = 0; i<ids.size(); i++){
			System.out.println(ids.get(i)+" " +scores.get(i));
			Optional<Novel> optional = novelRepository.findById(ids.get(i)+1);
			if(optional.isPresent()){
				NovelListDto novelListDto = optional.get().toListDto();
				novelListDto.setScore(scores.get(i));
				novelListDtos.add(novelListDto);
			}
		}
		return novelListDtos;
	}
}
