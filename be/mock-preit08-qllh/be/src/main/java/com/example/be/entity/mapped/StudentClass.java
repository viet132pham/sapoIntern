package com.example.be.entity.mapped;

import com.example.be.entity.Class;

import com.example.be.entity.compositekey.StudentClassComposite;
import com.example.be.entity.User;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
public class StudentClass  {

    @EmbeddedId
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private StudentClassComposite id ;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @MapsId("classId")
    @JoinColumn(name = "class_id")
    private Class classes;

    @NotNull
    private String status;

}
