package com.example.be.dto;

import com.example.be.entity.Class;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Service
public class StudentGradeDTO {
    private Long id;
    private long gradePoint;
    private long gradeId;
    private UserDTO student;
    private Class classes;
}
