package com.dev.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Builder
@Entity
@Table(name = "dieu")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "Dieu.findAll", query = "SELECT d FROM Dieu d"),
        @NamedQuery(name = "Dieu.findById", query = "SELECT d FROM Dieu d WHERE d.id = :id"),
        @NamedQuery(name = "Dieu.findByDieu", query = "SELECT d FROM Dieu d WHERE d.dieu = :dieu"),
        @NamedQuery(name = "Dieu.findByDiemToiDa", query = "SELECT d FROM Dieu d WHERE d.diemToiDa = :diemToiDa")
})
@EqualsAndHashCode
public class Dieu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Basic(optional = false)
    @NotNull
    @Column(name = "dieu")
    private int dieu;

    @Basic(optional = false)
    @NotNull
    @Column(name = "diem_toi_da")
    private int diemToiDa;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "dieu")
    private Set<HoatDong> hoatDongSet;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
}
