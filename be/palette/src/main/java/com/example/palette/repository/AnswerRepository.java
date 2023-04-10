package com.example.palette.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.palette.domain.entity.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
	List<Answer> findByType(String type);
}
