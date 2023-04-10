package com.example.palette.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.palette.domain.dto.UserDto;
import com.example.palette.model.BaseResponseBody;

@FeignClient(name = "user-client", url = "172.21.0.5:8080/api/v1/users")
public interface UserClient {

	@PostMapping(produces = "application/json")
	ResponseEntity<? extends BaseResponseBody> insertUser(@RequestBody UserDto userDto);

}
