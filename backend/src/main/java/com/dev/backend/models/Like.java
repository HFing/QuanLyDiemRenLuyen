package com.dev.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Builder
@Entity
@Table(name = "like")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries(value = {
        @NamedQuery(name = "Like.findAll", query = "SELECT l FROM Like l"),
        @NamedQuery(name = "Like.findById", query = "SELECT l FROM Like l WHERE l.id = :id"),
})
@EqualsAndHashCode
@ToString
public class Like implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @JoinColumn(name = "bai_viet_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    @JsonIgnore
    private BaiViet baiViet;


    @JoinColumn(name = "nguoi_dung_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User nguoiDung;

}
