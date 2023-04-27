package com.a509.service_novel.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.a509.service_novel.dto.Dialog;
import com.a509.service_novel.redis.DialogHistory;
import com.a509.service_novel.redis.DialogHistoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.a509.service_novel.dto.testdto;

@RequiredArgsConstructor
@Service
@Slf4j
public class NovelWriteService {

	private final DialogHistoryRepository dialogHistoryRepository;

	public void hello() {
		DialogHistory dialogHistory = new DialogHistory();

	}

	public void setDialogHistory(Object dialogHistory, int authorId) throws Exception{

		DialogHistory dialogEntity = new DialogHistory();
		dialogEntity.setAuthorId(authorId);
		dialogEntity.setDialogHistory(dialogHistory);
		dialogHistoryRepository.save(dialogEntity);

	}

	public void simplaSave(){
		DialogHistory dialogHistory = new DialogHistory();
		dialogHistoryRepository.save(dialogHistory);
	}

	public Object getDialogHistory(int authorId) throws Exception{
		DialogHistory dialogHistory= dialogHistoryRepository.findByAuthorId(authorId);
		return dialogHistory.getDialogHistory();
	}
}
