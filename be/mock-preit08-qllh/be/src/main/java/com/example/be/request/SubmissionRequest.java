package com.example.be.request;

import com.example.be.dto.UserDTO;
import com.example.be.entity.Document;
import com.example.be.entity.compositekey.SubmissionComposite;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionRequest {
    private SubmissionComposite id ;
    private String url;
    private Date createdDate;
    private long studentId;
    private long documentId;
}
