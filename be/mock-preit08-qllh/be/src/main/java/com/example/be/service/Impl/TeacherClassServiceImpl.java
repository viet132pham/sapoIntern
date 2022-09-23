package com.example.be.service.Impl;
import com.example.be.dto.TeacherClassDTO;
import com.example.be.dto.UserDTO;
import com.example.be.entity.Class;
import com.example.be.entity.User;
import com.example.be.entity.compositekey.TeacherClassComposite;
import com.example.be.entity.mapped.TeacherClass;

import com.example.be.repository.ClassRepository;
import com.example.be.repository.TeacherClassRepository;
import com.example.be.repository.UserRepository;
import com.example.be.request.TeacherClassRequest;
import com.example.be.service.TeacherClassService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;


@Service
@Log4j2
public class TeacherClassServiceImpl implements TeacherClassService {
    @Autowired
     TeacherClassRepository teacherClassRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ClassRepository classRepository;
//    public TeacherClass update( long id, TeacherClass v)  {
//        TeacherClass teacherClass = teacherClassRepository.findById((long) id).get();
//        if(teacherClass.getId()!=null){
//            teacherClass.setClasses(v.getClasses());
//            teacherClass.setTeacher(v.getTeacher());
//            teacherClass.setStatus(v.getStatus());
//            return teacherClassRepository.save(teacherClass);
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

    public List<TeacherClassDTO> findAllTeacherClassDTO() {
        List<TeacherClass> teacherClasses = teacherClassRepository.findAll();
        List<TeacherClassDTO> teacherClassDTOS = new ArrayList<>();
        for (int i = 0; i < teacherClasses.size(); i++){
            TeacherClassDTO teacherClassDTO = new TeacherClassDTO();
            TeacherClass teacherClass = teacherClasses.get(i);
            mapper.map(teacherClass, teacherClassDTO);

            User user = teacherClass.getTeacher();
            UserDTO userDTO = new UserDTO();

            mapper.map(user, userDTO);
            userDTO.getRoles().removeAll(userDTO.getRoles());
            user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});

            teacherClassDTO.setTeacher(userDTO);
            teacherClassDTOS.add(teacherClassDTO);
        }

        return teacherClassDTOS;
    }
    public List<TeacherClassDTO> findTeacherClassDTOByTeacherId(Long id) {
        // Lấy User entity ra từ DB
        List<TeacherClass> teacherClasses = teacherClassRepository.findTeacherClassDTOByTeacherId(id);
        System.out.println(teacherClasses);
        List<TeacherClassDTO> teacherClassDTOS = new ArrayList<>();

        for (int i = 0; i < teacherClasses.size(); i++){
            TeacherClassDTO teacherClassDTO = new TeacherClassDTO();
            TeacherClass teacherClass = teacherClasses.get(i);
            mapper.map(teacherClass, teacherClassDTO);
            User user = teacherClass.getTeacher();
            UserDTO userDTO = new UserDTO();

            mapper.map(user, userDTO);
            userDTO.getRoles().removeAll(userDTO.getRoles());
            user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});

            teacherClassDTO.setTeacher(userDTO);
            teacherClassDTOS.add(teacherClassDTO);
        }

        return teacherClassDTOS;
    }

    @Override
    public TeacherClassDTO findTeacherClassDTOByClassId(Long id) {
        // Lấy User entity ra từ DB
        TeacherClass teacherClass = teacherClassRepository.findTeacherClassDTOByClassId(id);
            TeacherClassDTO teacherClassDTO = new TeacherClassDTO();
            mapper.map(teacherClass, teacherClassDTO);
            User user = teacherClass.getTeacher();
            UserDTO userDTO = new UserDTO();
            mapper.map(user, userDTO);
            userDTO.getRoles().removeAll(userDTO.getRoles());
            user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});
            teacherClassDTO.setTeacher(userDTO);
        return teacherClassDTO;
    }

    //post request
    public TeacherClass createRequest(TeacherClassRequest teacherClassRequest, BindingResult bindingResult){
        TeacherClass teacherClass = new TeacherClass();
        User u = new User();
        u = userRepository.findUserById(teacherClassRequest.getTeacherId());
        Class c = new Class();
        c = classRepository.findClassById(teacherClassRequest.getClassId());
        TeacherClassComposite id = new TeacherClassComposite();
        teacherClass.setClasses(c);
        teacherClass.setTeacher(u);
        id.setTeacherId(teacherClassRequest.getTeacherId());
        id.setClassId(teacherClassRequest.getClassId());
        teacherClassRequest.setId(id);
        mapper.map(teacherClassRequest, teacherClass);
        return teacherClassRepository.save(teacherClass);
    }

}