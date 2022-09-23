package com.example.be.controller;

import com.example.be.dto.UserDTO;
import com.example.be.entity.User;
import com.example.be.repository.UserRepository;

import com.example.be.request.UpdatePasswordRequest;
import com.example.be.request.UserRequest;
import com.example.be.response.EmployeeResponse;
import com.example.be.service.BaseService;
import com.example.be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
public class UserController extends BaseController<User> {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    public UserController(BaseService<User> baseService) {
        super(baseService);
    }

    @PutMapping("/{id1}/role/{id2}")
    public User update(@PathVariable(value = "id1") long id1, @PathVariable(value = "id2") long id2, @RequestBody @Valid User user, BindingResult bindingResult) {
        return userService.update(id1, id2, user, bindingResult);
    }
    @PostMapping("/role/{id2}")
    public User post(@PathVariable(value = "id2") long id2, @RequestBody @Valid User user, BindingResult bindingResult) {
        return userService.create(id2, user, bindingResult);
    }
    @Transactional
    @DeleteMapping("/{uid}/role/{rid}")
    public void delete(@PathVariable(value = "uid") long uid, @PathVariable(value = "rid") long rid) {
        userRepository.deleteUserRole(uid, rid);
    }

    @GetMapping("/find/{username}")
    public UserDTO findUserByUsername(@PathVariable(value = "username") String username) {
        return userService.findUserByUsername(username);
    }

    @GetMapping("/get")
    public List<User> findList(@RequestParam String role) {
        return userService.findUserByRoleCode(role);
    }

    @GetMapping("/dto")
    public List<UserDTO> findAllDTO() {
        return userService.findAllDTO();
    }

    @GetMapping("/get/{id}")
    public UserDTO list(@PathVariable(value = "id") Long id) {
        return userService.findById(id);
    }


    //post request
    @PostMapping("/post")
    public User postRequest(@RequestBody @Valid UserRequest userRequest, BindingResult bindingResult) {
        return userService.createRequest(userRequest, bindingResult);
    }

    //truy van best employee
    @GetMapping("/find/best")
    public List<EmployeeResponse> findBestEmployee() {
        return userRepository.findBestEmployee();
    }

    //put user request
    @PutMapping("/put/{id}")
    public User updateUserDTO(@PathVariable(value = "id") long id, @RequestBody @Valid UserDTO userDTO, BindingResult bindingResult) {
        return userService.updateUserDTO(id, userDTO, bindingResult);
    }

    // get user request
    @GetMapping("/admin/get/{id}")
    public UserRequest findUserRequest(@PathVariable(value = "id") long id) {
        return userService.findUserRequest(id);
    }

    @DeleteMapping("/admin/delete/{id}")
    public void deleteByUpdateStatus(@PathVariable(value = "id") long id){
        userService.deleteByUpdateStatus(id);
    }

    @PutMapping("/update/info/{id}")
    public User updateInfo(@PathVariable(value = "id") long id, @RequestBody @Valid UserDTO userDTO, BindingResult bindingResult){
        return userService.updateInfo(id, userDTO, bindingResult);
    }
    @PutMapping("/update/password/{id}")
    public ResponseEntity<?> updatePassword(@PathVariable(value = "id") long id,
                                            @RequestBody @Valid UpdatePasswordRequest updatePasswordRequest,
                                            BindingResult bindingResult) throws Exception{
        return userService.updatePassword(id, updatePasswordRequest, bindingResult);
    }
}

