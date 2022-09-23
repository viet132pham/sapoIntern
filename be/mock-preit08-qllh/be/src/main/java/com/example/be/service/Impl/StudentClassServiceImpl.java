package com.example.be.service.Impl;
import com.example.be.dto.StudentClassDTO;
import com.example.be.dto.UserDTO;
import com.example.be.entity.Class;
import com.example.be.entity.User;
import com.example.be.entity.compositekey.StudentClassComposite;
import com.example.be.entity.mapped.StudentClass;

import com.example.be.repository.ClassRepository;
import com.example.be.repository.StudentClassRepository;
import com.example.be.repository.UserRepository;
import com.example.be.request.StudentClassRequest;
import com.example.be.service.StudentClassService;

import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class StudentClassServiceImpl implements StudentClassService {
    @Autowired
     StudentClassRepository submissionRepository;
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private StudentClassRepository studentClassRepository;

//    @Override
//    public StudentClass update( long id, StudentClass v)  {
//        StudentClass submission = submissionRepository.findById((long) id).get();
//        if(submission.getId()!=null){
//            submission.setProgress_grade(v.getProgress_grade());
//            submission.setClasses(v.getClasses());
//            submission.setStudent(v.getStudent());
//            submission.setStatus(v.getStatus());
//            submission.setTest1_grade(v.getTest1_grade());
//            submission.setTest2_grade(v.getTest2_grade());
//            submission.setTest3_grade(v.getTest3_grade());
//
//            return submissionRepository.save(submission);
//
//        }else {
////            throw new RecordNotFoundException("Not found");
//
//        }
//        return null;
//    }

    public List<StudentClassDTO> findAllStudentClassDTO() {
        List<StudentClass> submissiones = submissionRepository.findAll();
//        System.out.println(submissiones);
        List<StudentClassDTO> submissionDTOS = new ArrayList<>();
        for (int i = 0; i < submissiones.size(); i++){
            StudentClassDTO submissionDTO = new StudentClassDTO();
            StudentClass submission = submissiones.get(i);
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

    @Override
    public List<StudentClassDTO> findStudentClassDTOByStudentId(Long id) {
        // Lấy User entity ra từ DB
        List<StudentClass> submissiones = submissionRepository.findStudentClassDTOByStudentId(id);
//        System.out.println(submissiones);
        List<StudentClassDTO> submissionDTOS = new ArrayList<>();

        for (int i = 0; i < submissiones.size(); i++){
            StudentClassDTO submissionDTO = new StudentClassDTO();
            StudentClass submission = submissiones.get(i);
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

    @Override
    public List<StudentClassDTO> findStudentClassDTOByClassId(Long id) {
        // Lấy User entity ra từ DB
        List<StudentClass> submissiones = submissionRepository.findStudentClassDTOByClassId(id);

        List<StudentClassDTO> submissionDTOS = new ArrayList<>();
        for (int i = 0; i < submissiones.size(); i++){
            StudentClassDTO submissionDTO = new StudentClassDTO();
            StudentClass submission = submissiones.get(i);
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

    @Override
    public StudentClassDTO findStudentClassDTOByStudentIdAndClassId(Long sid, Long cid) {
        List<StudentClass> studentClasses = submissionRepository.findStudentClassDTOByStudentIdAndClassId(sid, cid);
        StudentClassDTO studentClassDTO = new StudentClassDTO();
        mapper.map(studentClasses.get(0), studentClassDTO);
        return studentClassDTO;
    }

    //post request
    public StudentClass createRequest(StudentClassRequest studentClassRequest, BindingResult bindingResult){
        StudentClass studentClass = new StudentClass();
        User u = new User();
        u = userRepository.findUserById(studentClassRequest.getStudentId());
        Class c = new Class();
        c = classRepository.findClassById(studentClassRequest.getClassId());
        StudentClassComposite id = new StudentClassComposite();
        studentClass.setClasses(c);
        studentClass.setStudent(u);
        id.setStudentId(studentClassRequest.getStudentId());
        id.setClassId(studentClassRequest.getClassId());
        studentClassRequest.setId(id);
        mapper.map(studentClassRequest, studentClass);
        return submissionRepository.save(studentClass);
    }

    //put diem
    public StudentClass updateStudentClassRequest(long sid, long cid, StudentClassRequest studentClassRequest, BindingResult bindingResult){
        StudentClass studentClass = studentClassRepository.findStudentClassByClassIdAndStudentId(sid, cid);

        StudentClassComposite id = new StudentClassComposite();

        return submissionRepository.save(studentClass);
    }

    public StudentClass adminUpdateStudentClassRequest(long sid, long cid, StudentClassRequest studentClassRequest, BindingResult bindingResult){
        StudentClass studentClassOld = studentClassRepository.findStudentClassByClassIdAndStudentId(sid, cid);
        StudentClass studentClass = new StudentClass();
        User u = new User();
        u = userRepository.findUserById(studentClassRequest.getStudentId());
        Class c = new Class();
        c = classRepository.findClassById(studentClassRequest.getClassId());
        StudentClassComposite id = new StudentClassComposite();
        studentClass.setClasses(c);
        studentClass.setStudent(u);
        id.setStudentId(studentClassRequest.getStudentId());
        id.setClassId(studentClassRequest.getClassId());
        studentClassRequest.setId(id);
        mapper.map(studentClassRequest,studentClass);

        studentClassRepository.deleteStudentClassByClassIdAndStudentId(sid, cid);
        return submissionRepository.save(studentClass);
    }
}