package com.example.be.dto;

import com.example.be.entity.Class;
import com.example.be.entity.compositekey.StudentClassComposite;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Service
public class StudentClassDTO {
    private StudentClassComposite id;
    private String status;
    private UserDTO student;
    private Class classes;
}
