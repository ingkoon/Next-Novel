package com.a509.eureka_api_gateway.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.*;

@Slf4j
@Component
public class JwtTokenProvider {

	/** ===== 레퍼런스 =====
	 * Spring Security & Jwt 로그인 적용하기
	 * https://velog.io/@jkijki12/Spirng-Security-Jwt-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
	 *
	 * jwt refresh token 적용기
	 * https://velog.io/@jkijki12/Jwt-Refresh-Token-%EC%A0%81%EC%9A%A9%EA%B8%B0
	 *
	 * https://velog.io/@solchan/%EB%B0%B1%EC%97%85-Refresh-Token-%EB%B0%9C%EA%B8%89%EA%B3%BC-Access-Token-%EC%9E%AC%EB%B0%9C%EA%B8%89
	 */

	@Value("${jwt.secret}")
	private String uniqueKey;

	private int accessTokenValidTime = 1000 * 60 * 90; // AccessToken 유효시간. (단위: ms) DEFAULT: 90분, QA 및 디버깅: 30초
	// private int accessTokenValidTime = 1000 * 30;
	private int refreshTokenValidTime = 1000 * 60 * 60 * 12; // RefreshToken 유효시간. (단위: ms) DEFAULT: 12시간, QA 및 디버깅: 5분


	// 유저 정보를 토대로 AccessToken, RefreshToken을 생성하는 메서드
	private static final String EMAIL_KEY = "email";
	private static final String NAME_KEY = "name";
	private static final String AUTHORITIES_KEY = "auth";
	private static final String BEARER_TYPE = "Bearer";
	// private static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 1000L;  
	private static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000L;            // 30분
	//    private static final long ACCESS_TOKEN_EXPIRE_TIME = 3 * 1000L;              // 3초
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000L;    // 7일
	//    private static final long REFRESH_TOKEN_EXPIRE_TIME = 60 * 1000L;    // 1분
	private final Key key;

	private static final String AUTHORIZATION_HEADER = "Authorization";


	public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
		System.out.println(secretKey);
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	// 유저 정보를 가지고 AccessToken, RefreshToken 을 생성하는 메서드
	public String generateToken(Map<String,Object> payload) {
		long now = (new Date()).getTime();
		// Access Token 생성

		Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
		String accessToken = Jwts.builder()
				.signWith(key, SignatureAlgorithm.HS256)
				.setHeaderParam("typ", "JWT")
				.setSubject((String) payload.get("sub"))
				.claim(EMAIL_KEY, payload.get(EMAIL_KEY))
				.claim(AUTHORITIES_KEY, payload.get(AUTHORITIES_KEY))
				.setExpiration(accessTokenExpiresIn)
				.compact();

		return accessToken;
	}

	public String resolveToken(ServerHttpRequest request) {
		HttpHeaders requestHeader = request.getHeaders();
		String accessToken = requestHeader.get(AUTHORIZATION_HEADER).get(0);
		System.out.println("[resolveToken@JwtTokenProvider]" + accessToken);
		if (StringUtils.hasText(accessToken) && accessToken.startsWith(BEARER_TYPE)) {
			return accessToken.substring(7);
		}
		return null;
	}

	// 토큰 정보를 검증하는 메서드
	public boolean validateToken(String token,String tokenType) {
		System.out.println(tokenType +" "+token);
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(uniqueKey).parseClaimsJws(token);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (SecurityException | MalformedJwtException e) {
			log.info("유효하지 않은 Token !! -> " + token);
		} catch (ExpiredJwtException e) {
			log.info("만료된 Token !! -> " + token);
		} catch (UnsupportedJwtException e) {
			log.info("지원하지 않는 형식의 Token !! -> " + token);
		} catch (IllegalArgumentException e) {
			log.info("Token이 빈 문자열을 반환하였습니다 !! -> " + token);
		}
		return false;
	}

}
