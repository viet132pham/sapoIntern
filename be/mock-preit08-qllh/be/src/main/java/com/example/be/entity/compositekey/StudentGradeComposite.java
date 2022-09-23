package com.example.be.entity.compositekey;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentGradeComposite implements Serializable {
    @Column(name = "student_id")
    Long studentId;

    @Column(name = "class_id")
    Long classId;

    @Column(name = "grade_id")
    long gradeId;
}
