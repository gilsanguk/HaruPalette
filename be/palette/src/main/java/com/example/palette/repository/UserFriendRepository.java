package com.example.palette.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.palette.domain.entity.Friend;
import com.example.palette.domain.entity.User;
import com.example.palette.domain.entity.UserFriend;

public interface UserFriendRepository extends JpaRepository<UserFriend, String> {

	Optional<Friend> findFriendByUser(User user);

	List<Object> findByUser(User user);

	Optional<UserFriend> findByUserIdAndFriendId(String userId, Long friendId);
}
