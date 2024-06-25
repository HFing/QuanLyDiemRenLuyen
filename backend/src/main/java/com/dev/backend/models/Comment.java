package com.dev.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Builder
@Entity
@Table(name = "comment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQueries({
        @NamedQuery(name = "Comment.findAll", query = "SELECT c FROM Comment c"),
        @NamedQuery(name = "Comment.findById", query = "SELECT c FROM Comment c WHERE c.id = :id"),
        @NamedQuery(name = "Comment.findByNoiDung", query = "SELECT c FROM Comment c WHERE c.noiDung = :noiDung"),
        @NamedQuery(name = "Comment.findByThoiGian", query = "SELECT c FROM Comment c WHERE c.thoiGian = :thoiGian")
})
@EqualsAndHashCode
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Size(max = 105)
    @Column(name = "noi_dung")
    private String noiDung;

    @Column(name = "thoi_gian")
    @Temporal(TemporalType.TIMESTAMP)
    private Date thoiGian = new Date();

    @JoinColumn(name = "bai_viet_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    @JsonIgnore
    private BaiViet baiViet;

    @JoinColumn(name = "nguoi_dung_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User nguoiDung;

}
