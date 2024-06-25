package com.dev.backend.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Builder
@Entity
@Table(name = "hoat_dong")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "HoatDong.findAll", query = "SELECT h FROM HoatDong h"),
        @NamedQuery(name = "HoatDong.findById", query = "SELECT h FROM HoatDong h WHERE h.id = :id"),
        @NamedQuery(name = "HoatDong.findByTen", query = "SELECT h FROM HoatDong h WHERE h.ten = :ten"),
        @NamedQuery(name = "HoatDong.findByMoTa", query = "SELECT h FROM HoatDong h WHERE h.moTa = :moTa"),
        @NamedQuery(name = "HoatDong.findByDiem", query = "SELECT h FROM HoatDong h WHERE h.diem = :diem")
})
@EqualsAndHashCode
public class HoatDong implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Size(min = 10, max = 200, message = "{hoatdong.ten.nullErr}")
    @Column(name = "ten")
    private String ten;

    @Size(max = 400)
    @Column(name = "mo_ta")
    private String moTa;

    @Basic(optional = false)
    @NotNull
    @Min(value = 5, message = "{hoatdong.diem.sizeErr}")
    @Max(value = 10, message = "{hoatdong.diem.sizeErr}")
    @Column(name = "diem")
    private int diem;

    @JoinColumn(name = "dieu_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Dieu dieu;

    @JoinColumn(name = "hoc_ki_nam_hoc_id", referencedColumnName = "id")
    @ManyToOne
    private HocKiNamHoc hocKiNamHoc;

    @JoinColumn(name = "khoa_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Khoa khoa;

    @JoinColumn(name = "tro_ly_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private TroLySinhVien troLy;

    @OneToMany(mappedBy = "hoatDong")
    private Set<BaiViet> baiVietSet;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "hoatDong")
    private Set<SinhVienHoatDong> sinhVienHoatDongSet;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
}

