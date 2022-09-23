package com.example.be.controller;

import com.example.be.dto.StudentGradeDTOArray;
import com.example.be.dto.UserDTO;
import com.example.be.entity.Class;
import com.example.be.entity.User;
import com.example.be.repository.ClassRepository;
import com.example.be.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Controller
public class StudentGradeControllerArray {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassRepository classRepository;
    public List<StudentGradeDTOArray> findPoint(@PathVariable(value = "cid") long cid){
        String sql = "select sc.student_id, sc.class_id, group_concat(sg.grade_point) as point, group_concat(sg.grade_id) as grade_id " +
                "from student_class sc left join student_grade sg on sc.student_id = sg.student_id and sc.class_id = sg.class_id" +
                " where sc.class_id = ?  group by sc.student_id";

        RowMapper<StudentGradeDTOArray> rowMapper = new RowMapper<StudentGradeDTOArray>() {
            @Override
            public StudentGradeDTOArray mapRow(ResultSet rs, int rowNum) throws SQLException {
                StudentGradeDTOArray studentGradeDTOArray = new StudentGradeDTOArray();

                String point=rs.getString("point");

                String gradeId=rs.getString("grade_id");

                int studentId = rs.getInt("student_id");
                UserDTO student = new UserDTO();
                User user = userRepository.findUserById(studentId);
                mapper.map(user, student);
                student.getRoles().removeAll(student.getRoles());
                user.getRoles().forEach(role -> {student.getRoles().add(role.getRoleCode());});
                studentGradeDTOArray.setStudent(student);

                int classId = rs.getInt("class_id");
                Class aclass = classRepository.findClassById(classId);

                studentGradeDTOArray.setGradeId(gradeId);
                studentGradeDTOArray.setPoint(point);
                studentGradeDTOArray.setStudent(student);
                studentGradeDTOArray.setAclass(aclass);
                return studentGradeDTOArray;
            }
        };

        List<StudentGradeDTOArray> studentGradeDTOArrays = jdbcTemplate.query(sql,rowMapper,cid);

        return studentGradeDTOArrays;
    }

    public List<StudentGradeDTOArray> findPointStudent(@PathVariable(value = "cid") long cid, @PathVariable(value = "sid") long sid) {
        String sql = "select sc.student_id, sc.class_id, group_concat(sg.grade_point) as point, group_concat(sg.grade_id) as grade_id " +
                "from student_class sc left join student_grade sg on sc.student_id = sg.student_id and sc.class_id = sg.class_id" +
                " where sc.class_id = ? and sc.student_id = ?  group by sc.student_id";

        RowMapper<StudentGradeDTOArray> rowMapper = new RowMapper<StudentGradeDTOArray>() {
            @Override
            public StudentGradeDTOArray mapRow(ResultSet rs, int rowNum) throws SQLException {
                StudentGradeDTOArray studentGradeDTOArray = new StudentGradeDTOArray();

                String point=rs.getString("point");

                String gradeId=rs.getString("grade_id");

                int studentId = rs.getInt("student_id");
                UserDTO student = new UserDTO();
                User user = userRepository.findUserById(studentId);
                mapper.map(user, student);
                student.getRoles().removeAll(student.getRoles());
                user.getRoles().forEach(role -> {student.getRoles().add(role.getRoleCode());});
                studentGradeDTOArray.setStudent(student);

                int classId = rs.getInt("class_id");
                Class aclass = classRepository.findClassById(classId);

                studentGradeDTOArray.setGradeId(gradeId);
                studentGradeDTOArray.setPoint(point);
                studentGradeDTOArray.setStudent(student);
                studentGradeDTOArray.setAclass(aclass);
                return studentGradeDTOArray;
            }
        };

        List<StudentGradeDTOArray> studentGradeDTOArrays = jdbcTemplate.query(sql,rowMapper,cid, sid);

        return studentGradeDTOArrays;
    }
}
