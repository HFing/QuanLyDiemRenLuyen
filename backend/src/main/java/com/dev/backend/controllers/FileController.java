package com.dev.backend.controllers;

import com.dev.backend.models.ResponseObject;
import com.dev.backend.util.FileHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @PostMapping()
    public ResponseObject<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Upload file Successfully.",
                    FileHandler.saveFile(file)
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Failed to upload file. " + exception.getMessage(),
                    ""
            );
        }
    }

    @PutMapping()
    public ResponseObject<String> updateFile(@RequestParam("existingFile") String existingFileName,
                                             @RequestParam("newFile") MultipartFile newFile) {
        try {
            FileHandler fileHandler = new FileHandler();
            fileHandler.updateFile(existingFileName, newFile);
            return new ResponseObject<>("ok", "File updated successfully", null);
        } catch (IOException e) {
            return new ResponseObject<>("error", "Failed to update file", null);
        }

    }

    @DeleteMapping()
    public ResponseObject<String> deleteFile(@RequestParam("fileName") String fileName) {
        try {
            FileHandler fileHandler = new FileHandler();
            fileHandler.deleteFile(fileName);
            return new ResponseObject<>("ok", "File deleted successfully", null);
        } catch (IOException e) {
            return new ResponseObject<>("error", "Failed to delete file", null);
        }
    }
}
