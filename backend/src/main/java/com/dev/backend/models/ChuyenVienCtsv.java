package com.dev.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.io.Serializable;

@Builder
@Entity
@Table(name = "chuyen_vien_ctsv")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "ChuyenVienCtsv.findAll", query = "SELECT c FROM ChuyenVienCtsv c"),
        @NamedQuery(name = "ChuyenVienCtsv.findById", query = "SELECT c FROM ChuyenVienCtsv c WHERE c.id = :id")
})
@EqualsAndHashCode
public class ChuyenVienCtsv implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @JoinColumn(name = "nguoi_dung_id", referencedColumnName = "id")
    @OneToOne(optional = false, cascade = CascadeType.ALL)
    private User nguoiDung;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
}
