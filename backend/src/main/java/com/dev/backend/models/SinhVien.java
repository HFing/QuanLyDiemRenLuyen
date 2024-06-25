package com.dev.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Builder
@Entity
@Table(name = "sinh_vien")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "SinhVien.findAll", query = "SELECT s FROM SinhVien s"),
        @NamedQuery(name = "SinhVien.findById", query = "SELECT s FROM SinhVien s WHERE s.id = :id")
})
@EqualsAndHashCode
public class SinhVien implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "lop_id", referencedColumnName = "id")
    private Lop lop;

    @ManyToOne(optional = false)
    @JoinColumn(name = "nam_hoc_id", referencedColumnName = "id")
    private NamHoc namHoc;


    @JoinColumn(name = "nguoi_dung_id", referencedColumnName = "id")
    @OneToOne(optional = false, cascade = CascadeType.ALL)
    private User nguoiDung;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "sinhVien")
    private Set<SinhVienHoatDong> sinhVienHoatDongSet;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
}
