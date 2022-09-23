package com.example.be.request;

import com.example.be.entity.compositekey.TeacherClassComposite;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherClassRequest {
    private TeacherClassComposite id;
    private long teacherId;
    private String status;
    private long classId;
}
