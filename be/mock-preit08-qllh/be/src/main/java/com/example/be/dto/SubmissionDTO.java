package com.example.be.dto;

import com.example.be.entity.Document;
import com.example.be.entity.compositekey.SubmissionComposite;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Service
public class SubmissionDTO {
    private SubmissionComposite id ;
    private String url;
    private Date createdDate;
    private UserDTO student;
    private Document document;
}
