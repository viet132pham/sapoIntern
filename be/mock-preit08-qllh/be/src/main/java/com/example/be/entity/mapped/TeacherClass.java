package com.example.be.entity.mapped;

import com.example.be.entity.BaseEntity;
import com.example.be.entity.Class;
import com.example.be.entity.User;
import com.example.be.entity.compositekey.PaymentVoucherComposite;
import com.example.be.entity.compositekey.TeacherClassComposite;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
public class TeacherClass {
    @EmbeddedId
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private TeacherClassComposite id ;

    @ManyToOne
    @MapsId("teacherId")
    @JoinColumn(name = "teacher_id")
    private User teacher;

    @ManyToOne
    @MapsId("classId")
    @JoinColumn(name = "class_id")
    private Class classes;

    @NotNull
    private String status;
}
