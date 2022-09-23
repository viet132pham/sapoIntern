package com.example.be.service.Impl;

import com.example.be.entity.User;
import com.example.be.repository.JwtUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/*
JWTUserDetailsService implements the Spring Security UserDetailsService interface.
It overrides the loadUserByUsername for fetching user details from the database using the username.
The Spring Security Authentication Manager calls this method for getting the user details from the database
when authenticating the user details provided by the user. Here we are getting the user details from a hardcoded
User List. In the next tutorial we will be adding the DAO implementation for fetching User Details from the Database.
Also the password for a user is stored in encrypted format using BCrypt.
Previously we have seen Spring Boot Security - Password Encoding Using Bcrypt.
Here using the Online Bcrypt Generator you can generate the Bcrypt for a password.
 */
@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private JwtUserRepository jwtUserRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = jwtUserRepository.findUserByUsername(username);
        UserDetails userDetails ;
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        } else {
            Collection<GrantedAuthority> authorities = new ArrayList<>();
//            Collection<GrantedAuthority> roles = new ArrayList<>();

            if (null != user.getRoles()) user.getRoles().forEach(r -> {
//                roles.add(new SimpleGrantedAuthority(r.getRoleCode()));
                authorities.add(new SimpleGrantedAuthority(r.getRoleCode()));
                r.getPermissions().forEach(p -> authorities.add(new SimpleGrantedAuthority(p.getPermissionCode())));
            });
//            System.out.println(authorities);
//            System.out.println(roles);
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities) {
            };
        }
    }

    public User save(User user){
//        User newUser = new User();
//        newUser.setUsername(user.getUsername());
//        newUser.setCreatedAt(user.getCreatedAt());
//        newUser.setId(user.getId());
//        newUser.setAddress(user.getAddress());
//        newUser.setDob(user.getDob());
//        newUser.setEmail(user.getEmail());
//        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
//        newUser.setFullName(user.getFullName());
//        newUser.setPhone(user.getPhone());
//        newUser.setStatus(user.getStatus());
//
//        return jwtUserRepository.saveAndFlush(newUser);
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        return jwtUserRepository.saveAndFlush(user);
    }
}

