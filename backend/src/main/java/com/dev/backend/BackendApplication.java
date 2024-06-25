package com.dev.backend;

import com.dev.backend.services.IChuyenVienCtsvService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class BackendApplication implements CommandLineRunner {
    @Autowired
    private final IChuyenVienCtsvService ctsvService;

    @Override
    public void run(String... args) throws Exception {
        ctsvService.initChuyenVienCTSV();
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }


}

