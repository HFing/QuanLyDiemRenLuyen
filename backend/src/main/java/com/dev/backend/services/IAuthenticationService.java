package com.dev.backend.services;

import com.dev.backend.DTO.AuthenticationRequest;
import com.dev.backend.DTO.UserRequestDto;
import com.dev.backend.models.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface IAuthenticationService {


    List<Object> createAuthenticationToken(AuthenticationRequest authenticationRequest);

    UserRequestDto saveRegistration(User user, MultipartFile avatar);


    List<?> getAccountInformationByToken(String token);


}
