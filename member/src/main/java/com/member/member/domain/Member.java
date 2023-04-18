package com.member.member.domain;

import com.member.member.enums.Grade;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Member {
    @Column(name = "member_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String nickname;
    private Grade grade = Grade.NORMAL;

    @Builder
    public Member(String name, String nickname, int point){
        this.name = name;
        this.nickname = nickname;
    }

    public void updateName(String name){
        this.name = name;
    }
    public void updateNickname(String nickname){
        this.nickname = nickname;
    }
    public void updateGrade(Grade grade){
        this.grade = grade;
    }
}
