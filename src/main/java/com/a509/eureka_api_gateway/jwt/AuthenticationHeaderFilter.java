package com.a509.eureka_api_gateway.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.security.jwt.Jwt;
import org.springframework.security.jwt.JwtHelper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;

@Slf4j
@Component
public class AuthenticationHeaderFilter extends AbstractGatewayFilterFactory<AuthenticationHeaderFilter.Config> {

	private final JwtTokenProvider jwtTokenProvider;
	private final StringRedisTemplate stringRedisTemplate;
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000L;    // 7일
	private static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000L;              // 30분
	

	public AuthenticationHeaderFilter(JwtTokenProvider jwtTokenProvider, StringRedisTemplate stringRedisTemplate) {
		super(Config.class);
		this.jwtTokenProvider = jwtTokenProvider;
		this.stringRedisTemplate = stringRedisTemplate;
	}



	@Override
	public GatewayFilter apply(Config config) {

		return ((exchange, chain) -> {
			ServerHttpRequest request = exchange.getRequest();
			ServerHttpResponse response = exchange.getResponse();
			ServerWebExchange newExchange = exchange;

			// Step 1. RequestHeader에서 jwt 토큰 추출
			String accessToken = jwtTokenProvider.resolveToken(request);

			// String status = stringRedisTemplate.opsForValue().get(accessToken);
			// log.info(accessToken);
			// log.info("토큰검증!");

			// if(!ObjectUtils.isEmpty(status)){
			// 	log.info("로그아웃/회원 탈퇴 된 토큰입니다.");
			// 	return handleUnAuthorized(exchange);
			// }


			// Step 2. 토큰의 유효성 검사
			if (accessToken != null) { // 유효한 로그인 세션이라면

				String refreshToken = stringRedisTemplate.opsForValue().get("RT:"+accessToken);

				if (!ObjectUtils.isEmpty(refreshToken) && jwtTokenProvider.validateToken(refreshToken,"ref")) { // 만약 refreshToken의 유효시간이 아직 남았다면
					if (!jwtTokenProvider.validateToken(accessToken,"ace")) { // 만약 AccessToken의 유효시간이 만료되었다면
						log.info("유효한 로그인 세션이나, AccessToken이 만료되었습니다. AccessToken을 재발급합니다.");
						// 재발급 후, 컨텍스트에 다시 넣기
						// Refresh Token으로 사용자 ID 가져오기
						// UserId로 권한정보 받아오기
						// 토큰 발급

						Map<String, Object> refreshTokenPayload = decodeRefreshToken(refreshToken);

						String newAccessToken = jwtTokenProvider.generateToken(refreshTokenPayload);
						if(newAccessToken == null){							
							log.info("로그인 세션 유효시간이 만료되었습니다. 백엔드 접근 요청을 거부합니다.");
							return handleUnAuthorized(exchange);
						}


						response.getHeaders().add("Authorization", "bearer " + newAccessToken);

						ServerHttpRequest newRequest = exchange.getRequest()
							.mutate()
							.header("Authorization", "bearer " + newAccessToken)
							.build();

						newExchange = exchange.mutate().request(newRequest).build();
						// stringRedisTemplate.delete("RT:"+accessToken);
						stringRedisTemplate.opsForValue()
								.set("RT:" + newAccessToken, refreshToken, REFRESH_TOKEN_EXPIRE_TIME, TimeUnit.MILLISECONDS);




					} else {
						log.info("AccessToken의 유효시간이 아직 남아있습니다.");
					}
				} else {
					log.info("로그인 세션 유효시간이 만료되었습니다. 백엔드 접근 요청을 거부합니다.");
					return handleUnAuthorized(exchange);
				}
				return chain.filter(newExchange);
			} else {
				System.out.println("tokenDto가 널이였어!!!");
				return handleUnAuthorized(exchange);
			}
		});

	}


	private Mono<Void> handleUnAuthorized(ServerWebExchange exchange) {
		ServerHttpResponse response = exchange.getResponse();

		response.setStatusCode(HttpStatus.UNAUTHORIZED);
		return response.setComplete();
	}

	@Getter
	@Setter
	public static class Config {

	}

	public Map<String, Object> decodeRefreshToken(String refreshToken) {
		Jwt jwt = JwtHelper.decode(refreshToken);
		String claims = jwt.getClaims();

		// claims는 JSON 형태의 payload 값입니다.
		// 이를 Map<String, Object>로 변환하여 반환하거나 필요한 값을 추출하여 사용할 수 있습니다.
		// 예시: payload에서 "sub" 클레임 값을 가져오는 경우
		// String subject = (String) claims.get("sub");

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			return objectMapper.readValue(claims, new TypeReference<Map<String, Object>>() {});
		} catch (JsonProcessingException e) {
			// 복호화 및 JSON 파싱 예외 처리
			e.printStackTrace();
			return null;
		}
	}

}
