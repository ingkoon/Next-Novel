package com.a509.service_user.dto;

import com.a509.service_user.jpa.user.User;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Data
@Builder
@Getter
public class UserSignupDto {

    @NotEmpty(message = "이메일은 필수 입력값입니다.")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식에 맞지 않습니다.")
    private String email;
    private String password;
    private String provider;
    private String providerId;
    private String role;

    private String nickname;
    private String profileImage;

//    @CreationTimestamp
//    private LocalDateTime createdAt;
//    @UpdateTimestamp
//    private LocalDateTime updatedAt;

    public User toEntityUser() {
        return User.builder()
                .email(email)
                .password(password)
                .provider(provider)
                .providerId(providerId)
                .role(role)
                .nickname(nickname)
                .profileImage(profileImage)
//                .createdAt(createdAt)
//                .updatedAt(updatedAt)
                .build();
    }

}
