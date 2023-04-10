package com.example.palette.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.palette.domain.entity.File;

public interface FileRepository extends JpaRepository<File, Long> {

	Optional<File> findByDiary_Id(Long diaryId);
}
