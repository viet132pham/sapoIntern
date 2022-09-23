package com.example.be.entity.mapped;

import com.example.be.entity.Document;
import com.example.be.entity.User;

import com.example.be.entity.compositekey.SubmissionComposite;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@Entity
public class Submission {
    @EmbeddedId
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private SubmissionComposite id ;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @MapsId("documentId")
    @JoinColumn(name = "document_id")
    private Document document;

    @NotNull
    private String url;

    @NotNull
    private Date createdDate;

}
