package com.dev.backend.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.io.Serializable;

@Builder
@Entity
@Table(name = "sinh_vien_hoat_dong")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "SinhVienHoatDong.findAll", query = "SELECT s FROM SinhVienHoatDong s"),
        @NamedQuery(name = "SinhVienHoatDong.findById", query = "SELECT s FROM SinhVienHoatDong s WHERE s.id = :id"),
        @NamedQuery(name = "SinhVienHoatDong.findByTrangThai", query = "SELECT s FROM SinhVienHoatDong s WHERE s.trangThai = :trangThai")
})
@EqualsAndHashCode
public class SinhVienHoatDong implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Column(name = "trang_thai")
    private Boolean trangThai;

    @ManyToOne(optional = false)
    @JoinColumn(name = "hoat_dong_id", referencedColumnName = "id")
    private HoatDong hoatDong;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sinh_vien_id", referencedColumnName = "id")
    private SinhVien sinhVien;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
}
