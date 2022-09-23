package com.example.be.service.Impl;

import com.example.be.controller.StudentGradeControllerArray;
import com.example.be.dto.StudentGradeDTO;
import com.example.be.dto.StudentGradeDTOArray;
import com.example.be.dto.UserDTO;
import com.example.be.entity.Class;
import com.example.be.entity.User;

import com.example.be.entity.mapped.StudentGrade;
import com.example.be.repository.ClassRepository;
import com.example.be.repository.StudentGradeRepository;
import com.example.be.repository.UserRepository;
import com.example.be.request.StudentGradeRequest;
import com.example.be.service.StudentGradeService;
import lombok.extern.log4j.Log4j2;
import lombok.var;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class StudentGradeServiceImpl implements StudentGradeService {
    @Autowired
    private StudentGradeRepository studentGradeRepository;
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private StudentGradeControllerArray studentGradeControllerArray;

    @Autowired
    private UserRepository studentRepository;

    @Autowired
    private ClassRepository classRepository;

    @Override
    public List<StudentGradeDTO> findStudentGradeDTOByStudentIdAndClassId(long sid, long cid) {
        List<StudentGrade> studentGrades = studentGradeRepository.findStudentGradeDTOByStudentIdAndClassId(sid, cid);
        System.out.println(studentGradeRepository.findStudentGradeDTOByStudentIdAndClassId(sid, cid));

        List<StudentGradeDTO> studentGradeDTOS = new ArrayList<>();

        for (int i = 0; i < studentGrades.size(); i++){
            StudentGradeDTO studentGradeDTO = new StudentGradeDTO();
            StudentGrade studentGrade = studentGrades.get(i);
            mapper.map(studentGrade, studentGradeDTO);
            User user = studentGrade.getStudent();
            UserDTO userDTO = new UserDTO();

            mapper.map(user, userDTO);
            userDTO.getRoles().removeAll(userDTO.getRoles());
            user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});
            studentGradeDTO.setStudent(userDTO);
            studentGradeDTOS.add(studentGradeDTO);
        }
        return studentGradeDTOS;
    }

    @Override
    public List<StudentGradeDTOArray> findPoint(long cid){
        return studentGradeControllerArray.findPoint(cid);
    }
    @Override
    public List<StudentGradeDTOArray> findPointStudent(long cid, long sid){
        return studentGradeControllerArray.findPointStudent(cid, sid);
    }

    @Override
    public void updateStudentGrade(long cid, long sid, StudentGradeRequest studentGradeRequest){
//        System.out.println(studentGradeRequest);
        String[] gradeArray = null;
        String[] pointArray = null;
        gradeArray = studentGradeRequest.getGradeId().split(",");
        pointArray = studentGradeRequest.getPoint().split(",");
        User student = new User();
        Class classes = new Class();
        student = studentRepository.findUserById(studentGradeRequest.getStudentId());
        classes = classRepository.findClassById(studentGradeRequest.getClassId());
        for (int i = 0 ; i < gradeArray.length ; i++){
//            StudentGrade studentGrade;
            var studentGrade = studentGradeRepository.findStudentGradeDTOByStudentIdAndClassIdAndGradeId
                    (studentGradeRequest.getStudentId(),studentGradeRequest.getClassId(),Long.parseLong(gradeArray[i]));
            if (studentGrade == null) {
                studentGrade = new StudentGrade();
                studentGrade.setGradeId(Long.parseLong(gradeArray[i]));
                studentGrade.setGradePoint(Long.parseLong(pointArray[i]));
                studentGrade.setClasses(classes);
                studentGrade.setStudent(student);
            } else {
                studentGrade.setGradeId(Long.parseLong(gradeArray[i]));
                studentGrade.setGradePoint(Long.parseLong(pointArray[i]));
                studentGrade.setClasses(classes);
                studentGrade.setStudent(student);
            }
//            if (studentGradeRepository.findStudentGradeDTOByStudentIdAndClassIdAndGradeId
//                    (studentGradeRequest.getStudentId(),studentGradeRequest.getClassId(),Long.parseLong(gradeArray[i])) == null){
//                studentGrade.setGradeId(Long.parseLong(gradeArray[i]));
//                studentGrade.setGradePoint(Long.parseLong(pointArray[i]));
//                studentGrade.setClasses(classes);
//                studentGrade.setStudent(student);
//            } else {
//                studentGrade = studentGradeRepository.findStudentGradeDTOByStudentIdAndClassIdAndGradeId
//                        (studentGradeRequest.getStudentId(),studentGradeRequest.getClassId(),Long.parseLong(gradeArray[i]));
//                studentGrade.setGradeId(Long.parseLong(gradeArray[i]));
//                studentGrade.setGradePoint(Long.parseLong(pointArray[i]));
//                studentGrade.setClasses(classes);
//                studentGrade.setStudent(student);
//            }
            studentGradeRepository.save(studentGrade);
        }
    }
}
