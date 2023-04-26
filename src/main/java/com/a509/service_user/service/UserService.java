package com.a509.service_user.service;

import com.a509.service_user.dto.UserSignupDto;
import com.a509.service_user.jpa.user.User;
import com.a509.service_user.jpa.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void insertUser(UserSignupDto userSignupDto) throws Exception {
        userSignupDto.setRole("ROLE_USER");
        String rawPassword = userSignupDto.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        userSignupDto.setPassword(encPassword);
        User user = userSignupDto.toEntityUser();
        userRepository.save(user);
    }

}
