package com.dev.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Builder
@Entity
@Table(name = "khoa")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "Khoa.findAll", query = "SELECT k FROM Khoa k"),
        @NamedQuery(name = "Khoa.findById", query = "SELECT k FROM Khoa k WHERE k.id = :id"),
        @NamedQuery(name = "Khoa.findByTen", query = "SELECT k FROM Khoa k WHERE k.ten = :ten")
})
@EqualsAndHashCode
public class Khoa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Size(max = 45)
    @Column(name = "ten")
    private String ten;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "khoa")
    private Set<HoatDong> hoatDongSet;

    @OneToMany(mappedBy = "khoa")
    private Set<Lop> lopSet;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "khoa")
    private Set<TroLySinhVien> troLySinhVienSet;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
}
