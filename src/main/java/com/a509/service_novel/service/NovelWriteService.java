package com.a509.service_novel.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.a509.service_novel.redis.Dialog;
import com.a509.service_novel.redis.DialogHistory;
import com.a509.service_novel.redis.DialogHistoryRepository;
import com.a509.service_novel.redis.questions.Question;
import com.a509.service_novel.redis.questions.QuestionRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class NovelWriteService {

	private final DialogHistoryRepository dialogHistoryRepository;
	private final QuestionRepository questionRepository;

	@Transactional
	public void setDialogHistory(List<Object> objects, long memberId) throws Exception{

		DialogHistory dial = new DialogHistory();
		dial.setDialog(new ArrayList<>());
		for(Object object : objects)
		{
			LinkedHashMap<String,String> tmp = (LinkedHashMap<String, String>)object;
			Dialog d = new Dialog();
			d.setRole(tmp.get("role"));
			d.setContent(tmp.get("content"));
			dial.getDialog().add(d);
		}
		dial.setMemberId(memberId);
		// System.out.println(dial);
		// d.setDialog(dial);
		dialogHistoryRepository.save(dial);
	}

	@Transactional
	public List<Object> getDialogHistory(long memberId) throws Exception{

		Optional<DialogHistory> options= dialogHistoryRepository.findById(memberId);
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

	@Transactional
	public void setQuestion(List<String> questions, long memberId){
		Question question = new Question();

		question.setMemberId(memberId);
		question.setQuestions(questions);

		questionRepository.save(question);
	}

	@Transactional
	public Question getQuestion(long memberId) throws Exception{

		Optional<Question> optional  = questionRepository.findById(memberId);
		if(optional.isPresent()){
			return optional.get();
		}
		throw new SQLException();
	}
}
