package com.dev.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Builder
@Entity
@Table(name = "hoc_ki_nam_hoc")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "HocKiNamHoc.findAll", query = "SELECT h FROM HocKiNamHoc h"),
        @NamedQuery(name = "HocKiNamHoc.findById", query = "SELECT h FROM HocKiNamHoc h WHERE h.id = :id")
})
@EqualsAndHashCode
public class HocKiNamHoc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @OneToMany(mappedBy = "hocKiNamHoc")
    private Set<HoatDong> hoatDongSet;

    @JoinColumn(name = "hoc_ki_id", referencedColumnName = "id")
    @ManyToOne
    private HocKi hocKi;

    @JoinColumn(name = "nam_hoc_id", referencedColumnName = "id")
    @ManyToOne
    private NamHoc namHoc;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
}
