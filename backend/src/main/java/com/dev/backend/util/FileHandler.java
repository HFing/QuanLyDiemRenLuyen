package com.dev.backend.util;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

public class FileHandler {

    private static final Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "hfing",
            "api_key", "732251818997353",
            "api_secret", "m5icApBLfdTArvJ8A19BDjFONoA"));

    public static String saveFile(MultipartFile image) throws IOException {
        if (image == null)
            return "avt_default";
        else {
            try {
                String originalFilename = image.getOriginalFilename();
                assert originalFilename != null;
                String fileExtension = getFileExtension(originalFilename);
                String fileName = generateUniqueFileName(fileExtension);

                // Upload the file to Cloudinary
                Map uploadResult = cloudinary.uploader().upload(image.getBytes(),
                        ObjectUtils.asMap(
                                "folder", "qldrl",
                                "overwrite", true,
                                "resource_type", "auto",
                                "public_id", fileName)
                );

                return (String) uploadResult.get("url");
            } catch (Exception e) {
                e.printStackTrace();
                return "avt_default";
            }
        }
    }

    private static String generateUniqueFileName(String fileExtension) {
        return UUID.randomUUID() + fileExtension;
    }

    private static String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
            return fileName.substring(dotIndex);
        }
        return "";
    }

    public void updateFile(String existingFileName, MultipartFile newFile) throws IOException {
        deleteFile(existingFileName);
        saveFile(newFile);
    }

    public void deleteFile(String fileName) throws IOException {
        // Extract public_id from the file URL
        String publicId = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.lastIndexOf('.'));
        cloudinary.uploader().destroy("qldlr/" + publicId, ObjectUtils.emptyMap());
    }
}
