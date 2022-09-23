package com.example.be.service;

import com.example.be.dto.StudentClassDTO;
import com.example.be.dto.SubmissionDTO;
import com.example.be.entity.mapped.Submission;
import com.example.be.entity.mapped.Submission;
import com.example.be.request.SubmissionRequest;
import org.springframework.validation.BindingResult;

import java.util.List;


public interface SubmissionService{
    List<SubmissionDTO> findAllSubmissionDTO() ;
    Submission createRequest(SubmissionRequest submissionRequest, BindingResult bindingResult);

    List<SubmissionDTO> findSubmissionDTOByDocumentId(Long id);
}

