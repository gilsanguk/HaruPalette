package com.example.palette.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ProfileDto {

	String image;
	String friendEname;
	Long friendId;
	boolean isToday;
}
