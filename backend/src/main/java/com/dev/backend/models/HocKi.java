package com.dev.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Builder
@Entity
@Table(name = "hoc_ki")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "HocKi.findAll", query = "SELECT h FROM HocKi h"),
        @NamedQuery(name = "HocKi.findById", query = "SELECT h FROM HocKi h WHERE h.id = :id"),
        @NamedQuery(name = "HocKi.findByHocKi", query = "SELECT h FROM HocKi h WHERE h.hocKi = :hocKi")
})
@EqualsAndHashCode
public class HocKi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "hoc_ki")
    private String hocKi;

    @OneToMany(mappedBy = "hocKi")
    private Set<HocKiNamHoc> hocKiNamHocSet;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
}
