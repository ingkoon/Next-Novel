package com.a509.domain;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Point {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_id")
    private Long id;
    @NotNull
    private String nickName;
    @NotNull
    private Long point = 0L;
    private LocalDateTime updatedAt = LocalDateTime.now();
    @Builder
    public Point(String nickName){
        this.nickName = nickName;
    }
    public void updatePoint(Long point){
        this.point += point;
    }
}
