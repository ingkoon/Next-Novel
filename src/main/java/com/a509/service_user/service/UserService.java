package com.a509.service_user.service;

import com.a509.service_user.dto.request.UserSignupRequest;
import com.a509.service_user.exception.DuplicatedMemberException;
import com.a509.service_user.jpa.user.User;
import com.a509.service_user.jpa.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import springfox.documentation.spring.web.readers.operation.ResponseMessagesReader;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void insertUser(UserSignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicatedMemberException();
        }

        if (userRepository.existsByNickname(request.getNickname())) {
            throw new DuplicatedMemberException("중복된 닉네임입니다.");
        }

        User user = request.toEntityUser();
        user.setRole("ROLE_USER");
        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(encPassword);
        userRepository.save(user);
    }

}
