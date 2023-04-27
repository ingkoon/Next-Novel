package com.a509.service_payment.point.domain;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Point {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_id")
    private Long id;
    @NotNull
    private Long userId;
    @NotNull
    private Long point = 0L;
    private LocalDateTime updatedAt = LocalDateTime.now();
    @Builder
    public Point(Long userId){
        this.userId = userId;
    }
    public void updatePoint(Long point){
        this.point = point;
    }
}
