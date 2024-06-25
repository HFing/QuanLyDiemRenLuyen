package com.dev.backend.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Builder
@Entity
@Table(name = "tro_ly_sinh_vien")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "TroLySinhVien.findAll", query = "SELECT t FROM TroLySinhVien t"),
        @NamedQuery(name = "TroLySinhVien.findById", query = "SELECT t FROM TroLySinhVien t WHERE t.id = :id")
})
@EqualsAndHashCode
public class TroLySinhVien implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "troLy")
    private Set<HoatDong> hoatDongSet;

    @ManyToOne(optional = false)
    @JoinColumn(name = "khoa_id", referencedColumnName = "id")
    private Khoa khoa;


    @JoinColumn(name = "nguoi_dung_id", referencedColumnName = "id")
    @OneToOne(optional = false, cascade = CascadeType.ALL)
    private User nguoiDung;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

}
