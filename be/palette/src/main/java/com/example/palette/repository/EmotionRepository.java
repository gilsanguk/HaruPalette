package com.example.palette.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.palette.domain.entity.Diary;
import com.example.palette.domain.entity.Emotion;

public interface EmotionRepository extends JpaRepository<Emotion, Long> {
	Optional<Emotion> findByDiary(Diary diary);
}
