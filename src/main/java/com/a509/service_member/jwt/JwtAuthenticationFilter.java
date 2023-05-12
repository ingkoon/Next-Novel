package com.a509.service_member.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.nimbusds.jose.crypto.RSADecrypter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_TYPE = "Bearer";

    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate stringRedisTemplate;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        // 1. Request Header 에서 JWT 토큰 추출
        String token = resolveToken((HttpServletRequest) request);

        // 2. validateToken 으로 토큰 유효성 검사
        if (token != null) {
            String isValidate = jwtTokenProvider.validateToken(token);
            if(isValidate.equals("ok")) {
                // Redis 에 해당 accessToken logout 및 resign 여부 확인
                String isAvail = stringRedisTemplate.opsForValue().get(token);
                if (ObjectUtils.isEmpty(isAvail)) {
                    // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext 에 저장
                    Authentication authentication = jwtTokenProvider.getAuthentication(token);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    fail(response, "filterError : "+isAvail);
                    return;
                }
            } else if (isValidate.equals("expired")) {  // access token 유효시간 만료
                // refresh token 이 유효하면 access token 재발급
                System.out.println("토큰의 유효시간 만료됨!!!!!!");
                System.out.println(token);
                // refresh token 이 만료된 경우에는 null 값이 들어감
                String refreshToken = stringRedisTemplate.opsForValue().get("RT:"+jwtTokenProvider.getAuthentication(token).getName());
                System.out.println(refreshToken);
                if(refreshToken == null) {
                    fail(response, "refresh token is expired.");
                    return;
                } else {
                    System.out.println(jwtTokenProvider.validateToken(refreshToken));
//                    Member member = findMember(jwtTokenProvider.getMember(token));
                    DecodedJWT decodedJWT = JWT.decode(token);
                    System.out.println(decodedJWT);
                    System.out.println(JWT.decode(refreshToken).getExpiresAt().before(new Date()));
                    System.out.println("payload :");
                    System.out.println(decodedJWT.getPayload());
                    System.out.println("==========");
//                    Jws<Claims> claims = jwtTokenProvider.getClaims(token);
//                    String name = (String) jwtTokenProvider.getClaims(claims, "name");
//                    System.out.println(claims);
                    System.out.println(jwtTokenProvider.getAuthentication(token));
//                    RSADecrypter decrypter = new RSADecrypter(jwtTokenProvider.getPrivateKeyFromString())
                }
            } else {
                fail(response, "JWT token Error");
            }
        }
        chain.doFilter(request, response);
    }

    // Request Header 에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TYPE)) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private void fail(ServletResponse response, String msg) throws IOException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        httpResponse.getWriter().write(msg);
    }
}
