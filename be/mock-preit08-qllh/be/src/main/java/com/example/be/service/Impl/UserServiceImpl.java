package com.example.be.service.Impl;


import com.example.be.dto.UserDTO;
import com.example.be.entity.Role;
import com.example.be.entity.User;
import com.example.be.repository.BaseRepository;
import com.example.be.repository.RoleRepository;
import com.example.be.repository.UserRepository;
import com.example.be.request.UpdatePasswordRequest;
import com.example.be.request.UserRequest;
import com.example.be.response.EmployeeResponse;
import com.example.be.service.UserService;
import com.example.be.util.Utils;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {
    public UserServiceImpl(BaseRepository<User, Long> baseRepo, Utils utils){
        super(baseRepo, utils);
    }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private Utils utils;
    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Override
    public User update(long id1, long id2, User user, BindingResult bindingResult) {
        User t = userRepository.findById(id1).orElseThrow(() -> new IllegalArgumentException(("id not found: " + id1)));
        Role v = roleRepository.findById(id2).orElseThrow(() -> new IllegalArgumentException(("id not found: " + id2)));
        BindingResult result = utils.getListResult(bindingResult,user);
        if (result.hasErrors()) {
            throw utils.invalidInputException(result);
        } else {
            t.setCreatedAt(user.getCreatedAt());
            t.setId(user.getId());
            t.setAddress(user.getAddress());
            t.setDob(user.getDob());
            t.setEmail(user.getEmail());
            t.setPassword(bcryptEncoder.encode(user.getPassword()));
            t.setFullName(user.getFullName());
            t.setPhone(user.getPhone());
            t.setStatus(user.getStatus());
            t.getRoles().add(v);
            return userRepository.save(t);
        }
    }

    @Override
    public User create(long id2, User user, BindingResult bindingResult) {
        Role v = roleRepository.findById(id2).orElseThrow(() -> new IllegalArgumentException(("id not found: " + id2)));
        BindingResult result = utils.getListResult(bindingResult,user);
        if (result.hasErrors()) {
            throw utils.invalidInputException(result);
        } else {
            user.getRoles().add(v);
            return userRepository.save(user);
        }
    }

    @Override
    public List<User> findUserByRoleCode(String role) {
        return userRepository.findUserByRoles(roleRepository.findRoleByRoleCode(role));
    }

    @Autowired
    private ModelMapper mapper;

    @Override
    public UserDTO findById(Long id) {
        // Lấy User entity ra từ DB
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found: " + id));

        // Map thành DTO
        UserDTO userDTO = new UserDTO();

        mapper.map(user, userDTO);
        userDTO.getRoles().removeAll(userDTO.getRoles());
        user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});
        return userDTO;
    }

    public UserDTO findUserByUsername(String username) {
        // Lấy User entity ra từ DB
        List<User> users = userRepository.findUserByUsername(username);

        // Map thành DTO
        UserDTO userDTO = new UserDTO();

        mapper.map(users.get(0), userDTO);
        userDTO.getRoles().removeAll(userDTO.getRoles());
        users.get(0).getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});
        return userDTO;
    }

    public List<UserDTO> findAllDTO() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOS = new ArrayList<>();
        for (int i = 0; i < users.size(); i++){
            UserDTO userDTO = new UserDTO();
            User user = users.get(i);
            mapper.map(user, userDTO);
            userDTO.getRoles().removeAll(userDTO.getRoles());
            user.getRoles().forEach(role -> {userDTO.getRoles().add(role.getRoleCode());});
            userDTOS.add(userDTO);
        }
        return userDTOS;
    }

    //post request
    public User createRequest(UserRequest userRequest, BindingResult bindingResult){
        User user = new User();
        mapper.map(userRequest, user);
        System.out.println(userRequest.getRoleCode());
        for (int i = 0; i < userRequest.getRoleCode().size(); i++) {
            Role t = roleRepository.findRoleByRoleCode(userRequest.getRoleCode().get(i));
            user.getRoles().add(t);

        }
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    //put user request
    public User updateUserDTO(long id, UserDTO userDTO, BindingResult bindingResult) {
        User t = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(("id not found: " + id)));
        BindingResult result = utils.getListResult(bindingResult, userDTO);
        if (result.hasErrors()) {
            throw utils.invalidInputException(result);
        } else {
            t.setAddress(userDTO.getAddress());
            t.setUsername(userDTO.getUsername());
            t.setDob(userDTO.getDob());
            t.setEmail(userDTO.getEmail());
            t.setFullName(userDTO.getFullName());
            t.setPhone(userDTO.getPhone());
            t.setStatus(userDTO.getStatus());
            t.getRoles().removeAll(t.getRoles());
            for (int i = 0; i < userDTO.getRoles().size(); i++){
                t.getRoles().add(roleRepository.findRoleByRoleCode(userDTO.getRoles().get(i)));
            }
            return userRepository.save(t);
        }
    }



    //get user request
    public UserRequest findUserRequest(long id){
        User user = userRepository.findUserById(id);

        UserRequest userRequest = new UserRequest();
        mapper.map(user, userRequest);
        ArrayList<String> roleCodes = new ArrayList<>();
        user.getRoles().forEach(role -> {roleCodes.add(role.getRoleCode());});
        userRequest.setRoleCode(roleCodes);
        return userRequest;
    }

    //delete user by update status
    @Override
    public void deleteByUpdateStatus(long id) {
        User user = userRepository.findUserById(id);
        user.setStatus("INACTIVE");
        userRepository.save(user);
    }

    //User update info
    @Override
    public User updateInfo(long id, UserDTO userDTO, BindingResult bindingResult) {
        User t = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(("id not found: " + id)));
        BindingResult result = utils.getListResult(bindingResult, userDTO);
        if (result.hasErrors()) {
            throw utils.invalidInputException(result);
        } else {
            t.setAddress(userDTO.getAddress());
            t.setDob(userDTO.getDob());
            t.setEmail(userDTO.getEmail());
            t.setFullName(userDTO.getFullName());
            t.setPhone(userDTO.getPhone());
            return userRepository.save(t);
        }
    }

    @Override
    public ResponseEntity updatePassword(long id, UpdatePasswordRequest updatePasswordRequest, BindingResult bindingResult) {
        User t = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(("id not found: " + id)));
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            updatePasswordRequest.getUsername(),
                            updatePasswordRequest.getPassword()
                    )
            );
            t.setPassword(bcryptEncoder.encode(updatePasswordRequest.getNewPassword()));
            userRepository.save(t);
            return ResponseEntity.status(200).body("Update password thanh cong");
        }catch(Exception e){
            return ResponseEntity.status(403).body("Password sai");
        }
    }
}
