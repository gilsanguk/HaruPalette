package com.ssafy.palette.domain.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Character {

    // 기본키
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long characterId;

    // 이름
    private String name;

    // 설명
    private String contents;

    // 가격
    private int price;
}
