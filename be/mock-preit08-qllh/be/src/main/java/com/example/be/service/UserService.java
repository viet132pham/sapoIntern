package com.example.be.service;

import com.example.be.dto.UserDTO;
import com.example.be.entity.User;
import com.example.be.request.UpdatePasswordRequest;
import com.example.be.request.UserRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.util.List;


public interface UserService extends BaseService<User> {
    User update(long id1, long id2, User user, BindingResult bindingResult);

    User create(long id2, User user, BindingResult bindingResult);

    List<User> findUserByRoleCode(String role);

    UserDTO findById(Long id);

    List<UserDTO> findAllDTO();

    UserDTO findUserByUsername(String username);

    //post request
    User createRequest(UserRequest userRequest, BindingResult bindingResult);

    // pust user request
    User updateUserDTO(long id, UserDTO userDTO, BindingResult bindingResult);


    //get user request
    UserRequest findUserRequest(long id);

    void deleteByUpdateStatus(long id);

    User updateInfo(long id, UserDTO userDTO, BindingResult bindingResult);

    ResponseEntity updatePassword(long id, UpdatePasswordRequest updatePasswordRequest, BindingResult bindingResult);
}
