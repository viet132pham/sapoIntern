package com.example.be.service.Impl;
import com.example.be.dto.SubmissionDTO;
import com.example.be.dto.UserDTO;
import com.example.be.entity.Class;
import com.example.be.entity.Document;
import com.example.be.entity.User;
import com.example.be.entity.compositekey.SubmissionComposite;
import com.example.be.entity.mapped.Submission;
import com.example.be.entity.mapped.Submission;
import com.example.be.entity.mapped.Submission;
import com.example.be.repository.*;
import com.example.be.request.SubmissionRequest;
import com.example.be.service.SubmissionService;
import com.example.be.util.Utils;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;


@Service
@Log4j2
public class SubmissionServiceImpl implements SubmissionService {
    @Autowired
     SubmissionRepository submissionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DocumentRepository documentRepository;

//    @Override
//    public Submission update( long id, Submission v)  {
//        Submission submission = submissionRepository.findById((long) id).get();
//        if(submission.getId()!=null){
//            submission.setCreatedAt(v.getCreatedAt());
//            submission.setUrl(v.getUrl());
//            submission.setType(v.getType());
//            submission.setDocument(v.getDocument());
//            submission.setStudent(v.getStudent());
//
//            return submissionRepository.save(submission);
//
//        }else {
////            throw new RecordNotFoundException("Not found");
//
//        }
//        return null;
//
//    }
    
    @Autowired
    private ModelMapper mapper;

    public List<SubmissionDTO> findAllSubmissionDTO() {
        List<Submission> submissiones = submissionRepository.findAll();
        List<SubmissionDTO> submissionDTOS = new ArrayList<>();
        for (int i = 0; i < submissiones.size(); i++){
            SubmissionDTO submissionDTO = new SubmissionDTO();
            Submission submission = submissiones.get(i);
            mapper.map(submission, submissionDTO);

            User user = submission.getStudent();
            UserDTO userDTO = new UserDTO();

            mapper.map(user, userDTO);
            userDTO.getRoles().removeAll(userDTO.getRoles());
            user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});

            submissionDTO.setStudent(userDTO);
            submissionDTOS.add(submissionDTO);
        }

        return submissionDTOS;
    }

    //post request
    public Submission createRequest(SubmissionRequest submissionRequest, BindingResult bindingResult){
        Submission submission = new Submission();
        User u = userRepository.findUserById(submissionRequest.getStudentId());
        Document d = documentRepository.findDocumentById(submissionRequest.getDocumentId());
        SubmissionComposite id = new SubmissionComposite();
        submission.setDocument(d);
        submission.setStudent(u);
        id.setStudentId(submissionRequest.getStudentId());
        id.setDocumentId(submissionRequest.getDocumentId());
        submissionRequest.setId(id);
        mapper.map(submissionRequest, submission);
        System.out.println(submission.getStudent());
        System.out.println(submission.getDocument());
        System.out.println(submission.getId());
        System.out.println(submission.getUrl());
        System.out.println(submission.getClass());
        return submissionRepository.save(submission);
    }

    @Override
    public List<SubmissionDTO> findSubmissionDTOByDocumentId(Long id) {
        List<Submission> submissions = submissionRepository.findSubmissionDTOByDocumentId(id);

        List<SubmissionDTO> submissionDTOS = new ArrayList<>();
        for(int i=0; i<submissions.size(); i++) {
            SubmissionDTO submissionDTO = new SubmissionDTO();
            Submission submission = submissions.get(i);
            mapper.map(submission, submissionDTO);
            User user = submission.getStudent();
            UserDTO userDTO = new UserDTO();
            mapper.map(user, userDTO);
            userDTO.getRoles().removeAll(userDTO.getRoles());
            user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});

            submissionDTO.setStudent(userDTO);
            submissionDTOS.add(submissionDTO);
        }

        return submissionDTOS;
    }
}