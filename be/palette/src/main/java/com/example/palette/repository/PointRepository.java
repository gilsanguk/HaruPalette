package com.example.palette.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.palette.domain.entity.Point;

public interface PointRepository extends JpaRepository<Point, Long> {
	List<Point> findByUser_Id(String userId);

	List<Point> findByUser_IdAndDateBetween(String userId, LocalDateTime start, LocalDateTime end, Sort date);

	List<Point> findByUser_IdAndDateBetweenAndPointGreaterThan(String userId, LocalDateTime start, LocalDateTime end,
															   int point, Sort date);

	List<Point> findByUser_IdAndDateBetweenAndPointLessThan(String userId, LocalDateTime start, LocalDateTime end,
															int point, Sort date);
}
