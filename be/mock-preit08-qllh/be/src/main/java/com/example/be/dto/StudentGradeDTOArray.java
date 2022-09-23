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
public class StudentGradeDTOArray {
//    private Long id;
    private String point;
    private String gradeId;
    private UserDTO student;
    private Class aclass;
}
