package com.dev.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Builder
@Entity
@Table(name = "nam_hoc")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "NamHoc.findAll", query = "SELECT n FROM NamHoc n"),
        @NamedQuery(name = "NamHoc.findById", query = "SELECT n FROM NamHoc n WHERE n.id = :id"),
        @NamedQuery(name = "NamHoc.findByNamHoc", query = "SELECT n FROM NamHoc n WHERE n.namHoc = :namHoc")
})
@EqualsAndHashCode
public class NamHoc implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Basic(optional = false)
    @NotNull
    @Column(name = "nam_hoc")
    private int namHoc;

    @OneToMany(mappedBy = "namHoc")
    private Set<HocKiNamHoc> hocKiNamHocSet;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "namHoc")
    private Set<SinhVien> sinhVienSet;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
}
