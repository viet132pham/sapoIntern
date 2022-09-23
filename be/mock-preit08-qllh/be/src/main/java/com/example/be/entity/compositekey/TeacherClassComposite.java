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
public class TeacherClassComposite implements Serializable {
    @Column(name = "teacher_id")
    Long teacherId;

    @Column(name = "class_id")
    Long classId;
}
