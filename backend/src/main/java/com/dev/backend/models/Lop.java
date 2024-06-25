package com.dev.backend.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Builder
@Entity
@Table(name = "lop")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "Lop.findAll", query = "SELECT l FROM Lop l"),
        @NamedQuery(name = "Lop.findById", query = "SELECT l FROM Lop l WHERE l.id = :id"),
        @NamedQuery(name = "Lop.findByTen", query = "SELECT l FROM Lop l WHERE l.ten = :ten")
})
@EqualsAndHashCode
public class Lop implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Size(max = 45)
    @Column(name = "ten")
    private String ten;

    @JoinColumn(name = "khoa_id", referencedColumnName = "id")
    @ManyToOne
    private Khoa khoa;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "lop")
    private Set<SinhVien> sinhVienSet;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
}
