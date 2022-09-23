package com.example.be.controller;

import com.example.be.dto.StudentClassDTO;
import com.example.be.dto.SubmissionDTO;
import com.example.be.entity.mapped.Submission;
import com.example.be.repository.SubmissionRepository;
import com.example.be.request.SubmissionRequest;
import com.example.be.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin()
@RequestMapping("/api/submission")
public class SubmissionController {
    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private SubmissionRepository submissionRepository;

    @GetMapping("/get")
    public List<SubmissionDTO> findAllSubmissionDTO() {
        return submissionService.findAllSubmissionDTO();
    }

    @GetMapping("/documentId/{id}")
    public List<SubmissionDTO> findSubmissionDTOByDocumentId(@PathVariable(value = "id") Long id) {
        return submissionService.findSubmissionDTOByDocumentId(id);
    }
    //post request
    @PostMapping({"/"})
    public void addNewSubmission() {
        this.submissionRepository.addNewSubmission();
    }
    @PostMapping("/post")
    public Submission postRequest(@RequestBody @Valid SubmissionRequest submissionClassRequest, BindingResult bindingResult) {
        submissionClassRequest.setCreatedDate(new Date());
        return submissionService.createRequest(submissionClassRequest, bindingResult);
    }
}