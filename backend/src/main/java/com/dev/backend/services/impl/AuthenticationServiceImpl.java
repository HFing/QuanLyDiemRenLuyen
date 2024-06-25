package com.dev.backend.services.impl;

import com.dev.backend.DTO.AuthenticationRequest;
import com.dev.backend.DTO.UserRequestDto;
import com.dev.backend.models.*;
import com.dev.backend.repositories.*;
import com.dev.backend.services.IAuthenticationService;
import com.dev.backend.services.IUserService;
import com.dev.backend.services.authenticationService.CustomUserDetailsService;
import com.dev.backend.util.FileHandler;
import com.dev.backend.util.JwtTokenUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthenticationServiceImpl implements IAuthenticationService {

    @Autowired
    private final IUserService userService;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final SinhVienRepository svRepository;
    @Autowired
    private final TroLySinhVienRepository tlsvRepository;
    @Autowired
    private final ChuyenVienCtsvRepository ctsvRepository;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final TokenRepository tokenRepository;

    private Token saveUserToken(User user) {

        final UserDetails userDetails =
                new CustomUserDetailsService(userService).loadUserByUsername(user.getEmail());
        Token t = new Token();
        t.setUser(userService.findUserByEmail(user.getEmail()).orElse(null));
        t.setToken(JwtTokenUtil.generateJwtToken(userDetails, 0));
        t.setTokenType(TokenType.BEARER);
        t.setRevoked(0);
        return tokenRepository.save(t);
    }

    @Override
    public List<Object> createAuthenticationToken(AuthenticationRequest authenticationRequest) {
        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();
        Optional<User> user = userService.findUserByEmail(username);
        if (user.isEmpty())
            throw new BadCredentialsException("No account found matching username.");
        if (user.get().getStatus() == Status.INACTIVE) {
            throw new BadCredentialsException("User is disabled.");
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            username,
                            password
                    )
            );
        } catch (BadCredentialsException exception) {
            throw new RuntimeException("Your password is incorrect. Please re-enter your password.");
        }
        User u = userRepository.save(user.get());
//        userService.changeRevokeAllUserTokens(username, -1);
        String token = saveUserToken(u).getToken();
        List<Object> result = new ArrayList<>();
        result.add(token);
        if (user.get().getRole() == Role.SV)
            result.add(svRepository.findByUserId(user.get().getId()));
        else if (user.get().getRole() == Role.TLSV)
            result.add(tlsvRepository.findByUserId(user.get().getId()));
        else if (user.get().getRole() == Role.CTSV)
            result.add(ctsvRepository.findByUserId(user.get().getId()));
        return result;
    }


    @Override
    public UserRequestDto saveRegistration(User user, MultipartFile avatar) {
        try {
            user.setAvatar(FileHandler.saveFile(avatar));
        } catch (IOException e) {
            throw new RuntimeException("Error when saving avatar");
        }
        return userService.registerUser(user);

    }

    @Override
    public List<?> getAccountInformationByToken(String token) {
        System.out.print(token);
        //List: revoked, isExpired, username, listRoles
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(tokenRepository);
        return tokenRepository.findByToken(token)
                .map(tokenRepo -> Arrays.asList(
                                tokenRepo.getRevoked(),
                                jwtTokenUtil.isTokenExpired(tokenRepo.getToken()),
                                jwtTokenUtil.extractUserName(tokenRepo.getToken()),
                                tokenRepository.findRoleByToken(tokenRepo.getToken())
                        )
                ).orElseThrow(() -> new RuntimeException("Your token is invalid, please login again to continue."));
    }


}
