package com.example.be.service;

import com.example.be.entity.Guest;
import com.example.be.request.GuestRequest;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface GuestService extends BaseService<Guest> {
    Guest update(long gid, long eid,Guest guest, BindingResult bindingResult);

    List<Guest> findGuestByEmployeeId(long id);
    List<Guest> findGuest();

    Guest create(GuestRequest guestRequest, BindingResult bindingResult);

    void deleteSupporting(long id);

}
