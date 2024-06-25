package com.dev.backend.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Builder
@Entity
@Table(name = "bai_viet")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "BaiViet.findAll", query = "SELECT b FROM BaiViet b"),
        @NamedQuery(name = "BaiViet.findById", query = "SELECT b FROM BaiViet b WHERE b.id = :id"),
        @NamedQuery(name = "BaiViet.findByTen", query = "SELECT b FROM BaiViet b WHERE b.ten = :ten"),
        @NamedQuery(name = "BaiViet.findByNgayTao", query = "SELECT b FROM BaiViet b WHERE b.ngayTao = :ngayTao"),
        @NamedQuery(name = "BaiViet.findByNoiDung", query = "SELECT b FROM BaiViet b WHERE b.noiDung = :noiDung")
})
public class BaiViet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Size(max = 45)
    @Column(name = "ten")
    private String ten;

    @Column(name = "ngay_tao")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayTao = new Date();

    @Size(max = 105)
    @Column(name = "noi_dung")
    private String noiDung;

    @JoinColumn(name = "hoat_dong_id", referencedColumnName = "id")
    @ManyToOne
    private HoatDong hoatDong;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "baiViet")
    private List<Comment> commentLst;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "baiViet")
    private List<Like> likeLst;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
}
