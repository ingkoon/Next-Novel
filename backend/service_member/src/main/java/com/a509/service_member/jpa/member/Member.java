package com.a509.service_member.jpa.member;

import com.a509.service_member.enums.MemberRole;
import com.a509.service_member.enums.MemberState;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Entity(name = "members")
@Getter
@NoArgsConstructor
public class Member{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;
    @NotNull
    private String email;
    @NotNull
    private String password;

    @NotNull
    private String nickName;
    private String profileImage;

    private String provider;    // null, google, kakao
    private String providerId;

    private String state;   // ACTIVE, RESIGNED
    private String role;    // ROLE_USER, ROLE_ADMIN

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public Member(String email, String password, String nickName, String profileImage, String provider, String providerId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.email = email;
        this.password = password;
        this.nickName = nickName;
        this.profileImage = profileImage;
        this.provider = provider;
        this.providerId = providerId;
        this.state = MemberState.ACTIVE.name();
        this.role = MemberRole.ROLE_USER.name();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
