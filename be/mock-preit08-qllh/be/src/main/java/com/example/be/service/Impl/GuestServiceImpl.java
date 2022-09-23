package com.example.be.service.Impl;

import com.example.be.controller.GuestController;
import com.example.be.entity.Guest;
import com.example.be.entity.User;
import com.example.be.repository.BaseRepository;
import com.example.be.repository.GuestRepository;
import com.example.be.repository.UserRepository;
import com.example.be.request.GuestRequest;
import com.example.be.service.GuestService;
import com.example.be.util.Utils;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;

@Service
@Log4j2
public class GuestServiceImpl extends BaseServiceImpl<Guest> implements GuestService {
    public GuestServiceImpl(BaseRepository<Guest, Long> baseRepo, Utils utils){
        super(baseRepo, utils);
    }

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Utils utils;

    @Autowired
    private ModelMapper mapper;
    @Override
    public Guest update(long gid,long eid, Guest guest, BindingResult bindingResult) {
        Guest t = guestRepository.findById(gid).orElseThrow(() -> new IllegalArgumentException(("id not found: " + gid)));
        User v = userRepository.findById(eid).orElseThrow(() -> new IllegalArgumentException(("id not found: " + eid)));
        t.setEmployees(v);
        return guestRepository.save(t);
    }

    public List<Guest> findGuestByEmployeeId(long id){
        return guestRepository.findGuestByEmployeesId(id);
    }

    public List<Guest> findGuest(){
        return guestRepository.findGuest();
    }

    @Override
    public Guest create(GuestRequest guestRequest, BindingResult bindingResult) {
        Guest guest = new Guest();
        mapper.map(guestRequest, guest);
        User user = userRepository.findUserById(guestRequest.getEmployeeId());
        guest.setEmployees(user);
        return guestRepository.save(guest);
    }

    @Override
    public void deleteSupporting(long id) {
        Guest guest = guestRepository.findById(id).get();
        guest.setEmployees(null);
        guestRepository.save(guest);
    }
}

