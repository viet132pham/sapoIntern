package com.example.be.request;

import com.example.be.entity.compositekey.StudentClassComposite;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentClassRequest {
    private StudentClassComposite id;
    private String status;
    private long studentId;
    private long classId;
}
