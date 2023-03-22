package com.ssafy.palette.service;

import java.util.List;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.ssafy.palette.PaletteAIGrpc;
import com.ssafy.palette.PaletteProto;
import com.ssafy.palette.domain.entity.Emotion;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.palette.domain.dto.DetailDiaryDto;
import com.ssafy.palette.domain.dto.DiaryDto;
import com.ssafy.palette.domain.entity.Answer;
import com.ssafy.palette.domain.entity.Diary;
import com.ssafy.palette.domain.entity.Friend;
import com.ssafy.palette.domain.entity.User;
import com.ssafy.palette.repository.AnswerRepository;
import com.ssafy.palette.repository.DiaryRepository;
import com.ssafy.palette.repository.FriendRepository;
import com.ssafy.palette.repository.UserRepository;
import com.ssafy.palette.repository.EmotionRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DiaryService {

	private final UserRepository userRepository;
	private final DiaryRepository diaryRepository;
	private final AnswerRepository answerRepository;
	private final FriendRepository friendRepository;
	private final EmotionRepository emotionRepository;
	public void writeDiary(DiaryDto diaryDto, String userId, PaletteAIGrpc.PaletteAIBlockingStub paletteAIStub)
	{
		Answer answer = answerRepository.findById(1L).get();
		User user = userRepository.findById(userId).get();
		Friend friend = friendRepository.findById(diaryDto.getFriendId()).get();
		LocalDate date = LocalDate.parse(diaryDto.getDate(), DateTimeFormatter.ofPattern("dd-MM-yyyy"));
		Diary diary = Diary.builder()
			.stickerCode(diaryDto.getStickerCode())
			.weather(diaryDto.getWeather())
			.contents(diaryDto.getContents())
			.registrationDate(date)
			.user(user)
			.friend(friend)
			.status("V")
			.answer(answer)
			.build();
		textToEmotion(diary.getContents(), user, diary, paletteAIStub);
		diaryRepository.save(diary);
	}

	public DetailDiaryDto detailDiary(Long diaryId, String userId) {

		// userId validation

		// set detail diary
		Diary diary = diaryRepository.findById(diaryId).get();
		DetailDiaryDto detailDiaryDto = DetailDiaryDto.toEntity(diary);
		// 파일 테이블에서 이미지 셋팅
		detailDiaryDto.setImage("abcd");

		return detailDiaryDto;
	}

	public void textToEmotion(String text, User user, Diary diary, PaletteAIGrpc.PaletteAIBlockingStub paletteAIStub) {
		PaletteProto.TextRequest request = PaletteProto.TextRequest.newBuilder().setText(text).build();
		PaletteProto.EmotionResponse response = paletteAIStub.textToEmotion(request);
		System.out.println(response);
		Emotion emotion = Emotion.builder()
			.neutral((int)(response.getNeutral() * 100))
			.happy((int)(response.getHappy() * 100))
			.surprise((int)(response.getSurprise() * 100))
			.anger((int)(response.getAnger() * 100))
			.anxiety((int)(response.getAnxiety() * 100))
			.sadness((int)(response.getSadness() * 100))
			.disgust((int)(response.getDisgust() * 100))
			.user(user)
			.diary(diary)
			.build();
		emotionRepository.save(emotion);
	}
}
