package com.example.be.controller;

import com.example.be.entity.Document;
import com.example.be.repository.DocumentRepository;
import com.example.be.request.DocumentRequest;
import com.example.be.service.BaseService;
import com.example.be.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.example.be.service.BaseService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/document")
public class DocumentController extends BaseController<Document>{
    public DocumentController(BaseService<Document> baseService) {
        super(baseService);
    }

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private DocumentService documentService;
    @GetMapping("/studentId/{id}")
    public List<Document> findDocumentByStudentId(@PathVariable(value="id") long id) {
        return documentRepository.findDocumentByStudentId(id);
    }
    @GetMapping("/teacherId/{id}")
    public List<Document> findDocumentByTeacherId(@PathVariable(value="id") long id) {
        return documentRepository.findDocumentByTeacherId(id);
    }
    @PostMapping("/post")
    public Document postRequest(@RequestBody @Valid DocumentRequest documentRequest, BindingResult bindingResult){
        return documentService.createRequest(documentRequest, bindingResult);
    }
}
