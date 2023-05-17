package com.a509.service_member.jwt;

import com.a509.service_member.dto.response.MemberTokenResponseDto;
import com.a509.service_member.jpa.member.Member;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {
    private static final String EMAIL_KEY = "email";
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "Bearer";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000L;              // 30분
//    private static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 1000L;              // 30초
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000L;    // 7일
//    private static final long REFRESH_TOKEN_EXPIRE_TIME = 60 * 1000L;    // 1분
    private final Key key;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // 유저 정보를 가지고 AccessToken, RefreshToken 을 생성하는 메서드
    public MemberTokenResponseDto generateToken(Authentication authentication, Member member) {
        long now = (new Date()).getTime();
        // Access Token 생성
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        String accessToken = Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setHeaderParam("typ","JWT")
                .setSubject(member.getId().toString())
                .claim(EMAIL_KEY, authentication.getName())
                .claim(AUTHORITIES_KEY, member.getRole())
                .setExpiration(accessTokenExpiresIn)
                .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setHeaderParam("typ","JWT")
                .setSubject(member.getId().toString())
                .claim(EMAIL_KEY, authentication.getName())
                .claim(AUTHORITIES_KEY, member.getRole())
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .compact();

        return MemberTokenResponseDto.builder()
                .memberId(member.getId())
                .nickName(member.getNickName())
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .refreshTokenExpirationTime(REFRESH_TOKEN_EXPIRE_TIME)
                .build();
    }

    // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
        // 토큰 복호화
        Claims claims = parseClaims(accessToken);

        if(claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // UserDetails 객체를 만들어서 Authentication 리턴
        UserDetails principal = new User(claims.get(EMAIL_KEY).toString(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    // 토큰 정보를 검증하는 메서드
    public String validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return "ok";
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
            return "invalid";
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
            return "expired";
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
            return "unsupported";
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
            return "empty";
        }
    }

    public Long getExpiration(String accessToken) {
        // accessToken 남은 유효시간
        Date expiration = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody().getExpiration();
        // 현재 시간
        Long now = new Date().getTime();
        return (expiration.getTime() - now);
    }

    public String getMember(String accessToken) {
        checkLength(accessToken);
        String token = accessToken.substring(7);

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public void checkLength(String token){
        if(token.length() < 7) throw new JwtException("올바르지 않은 토큰 유형입니다.");
    }

    // String으로 된 코드를 복호화한다.
//    public Jws<Claims> getClaims(String jwt) {
//        try {
//            // 암호화 키로 복호화한다.
//            // 즉 암호화 키가 다르면 에러가 발생한다.
//            return Jwts.parser()
//                    .setSigningKey(secretKey)
//                    .parseClaimsJws(jwt);
//        }catch(SignatureException e) {
//            return null;
//        }
//    }
//
//    // 토큰을 통해 Payload 의 데이터를 취득
//    public Object getClaims(Jws<Claims> claims, String key) {
//        // 데이터 취득
//        return claims.getBody()
//                .get(key);
//    }

}
