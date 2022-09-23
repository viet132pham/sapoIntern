package com.example.be.dto;

import com.example.be.entity.Class;
import com.example.be.entity.compositekey.TeacherClassComposite;
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
public class TeacherClassDTO {

    private TeacherClassComposite id ;
    private String status;
    private UserDTO teacher;
    private Class classes;
}
