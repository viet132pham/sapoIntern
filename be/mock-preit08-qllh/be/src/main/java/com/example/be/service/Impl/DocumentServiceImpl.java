package com.example.be.service.Impl;

import com.example.be.entity.Document;
import com.example.be.repository.BaseRepository;
import com.example.be.repository.ClassRepository;
import com.example.be.repository.DocumentRepository;
import com.example.be.request.DocumentRequest;
import com.example.be.service.DocumentService;
import com.example.be.util.Utils;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

@Service
@Log4j2
public class DocumentServiceImpl extends BaseServiceImpl<Document> implements DocumentService {
    public DocumentServiceImpl(BaseRepository<Document, Long> baseRepo, Utils utils) {
        super(baseRepo, utils);
    }

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private DocumentRepository documentRepository;

    // post request
    public Document createRequest(DocumentRequest documentRequest, BindingResult bindingResult){
        Document document = new Document();
        mapper.map(documentRequest, document);
        document.setClasses(classRepository.findClassById(documentRequest.getClassId()));
        return documentRepository.save(document);
    }
}
