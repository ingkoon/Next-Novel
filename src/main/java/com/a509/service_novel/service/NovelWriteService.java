package com.a509.service_novel.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.a509.service_novel.redis.Dialog;
import com.a509.service_novel.redis.DialogHistory;
import com.a509.service_novel.redis.DialogHistoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class NovelWriteService {

	private final DialogHistoryRepository dialogHistoryRepository;

	public void hello() {
		DialogHistory dialogHistory = new DialogHistory();

	}

	public void setDialogHistory(List<Object> object, int authorId) throws Exception{

		DialogHistory dial = new DialogHistory();
		dial.setDialog(new ArrayList<>());
		for(Object o : object)
		{
			LinkedHashMap<String,String> tmp = (LinkedHashMap<String, String>)o;
			Dialog d = new Dialog();
			d.setRole(tmp.get("role"));
			d.setContent(tmp.get("content"));
			dial.getDialog().add(d);
		}
		dial.setId(authorId);
		// System.out.println(dial);
		// d.setDialog(dial);
		dialogHistoryRepository.save(dial);
	}

	public List<Object> getDialogHistory(int authorId) throws Exception{

		Optional<DialogHistory> options= dialogHistoryRepository.findById(authorId);
		if(options.isPresent() == false)
			throw new SQLException();

		DialogHistory dialogHistory = options.get();
		List<Object> res= new ArrayList<>();
		List<Dialog> dialogs = dialogHistory.getDialog();
		for(Dialog dial : dialogs){
			// System.out.println(dial);
			Object o = dial;
			res.add(o);
		}
		return res;
	}
}
