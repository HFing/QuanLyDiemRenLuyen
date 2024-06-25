package com.dev.backend.DTO;

import com.dev.backend.models.BaiViet;
import com.dev.backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto implements Serializable {
    private String noiDung;
    private BaiViet baiViet;
    private User nguoiDung;
}
