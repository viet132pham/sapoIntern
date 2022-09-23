package com.example.be.service;

import com.example.be.entity.Document;
import com.example.be.request.DocumentRequest;
import org.springframework.validation.BindingResult;

public interface DocumentService extends BaseService<Document> {
    Document createRequest(DocumentRequest documentRequest, BindingResult bindingResult);
}
