package com.member.common.HttpConfig;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Slf4j
@Component
public class HttpConnectionToPoint {

    public boolean createPoint(Long memberId){
        RestTemplate template = new RestTemplate(new HttpComponentsClientHttpRequestFactory());

        MultiValueMap<String, Long> parameters = new LinkedMultiValueMap<>();
        parameters.add("memberId", memberId);

        HttpHeaders headers = new HttpHeaders();;

        headers.setContentType(MediaType.APPLICATION_JSON);



        HttpEntity<String> entity = new HttpEntity<String>("{\"memberId\":"+memberId+"}", headers);
        ResponseEntity<Void> result = template.postForEntity("http://localhost:8081/api/v1/point", entity, Void.class);
        HttpStatus code = result.getStatusCode();

        if(code.equals(HttpStatus.OK))
            return true;

        return false;
    }
}
