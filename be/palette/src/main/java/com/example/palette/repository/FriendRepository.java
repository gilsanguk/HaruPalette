package com.example.palette.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.palette.domain.entity.Friend;

public interface FriendRepository extends JpaRepository<Friend, Long> {
}
