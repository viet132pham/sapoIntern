package com.example.be.entity.mapped;

import com.example.be.entity.Class;
import com.example.be.entity.User;
import com.example.be.entity.compositekey.StudentClassComposite;
import com.example.be.entity.compositekey.StudentGradeComposite;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
@Getter
@Setter
@Entity
@Table(name = "student_grade")
public class StudentGrade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id ;

    @ManyToOne
//    @MapsId("studentId")
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
//    @MapsId("classId")
    @JoinColumn(name = "class_id")
    private Class classes;

    @NotNull
    private long gradePoint;

    @NotNull
    private long gradeId;


}
