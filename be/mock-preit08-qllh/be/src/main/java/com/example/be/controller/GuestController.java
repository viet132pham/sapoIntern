package com.example.be.controller;

import com.example.be.entity.Guest;
import com.example.be.entity.User;
import com.example.be.request.GuestRequest;
import com.example.be.service.BaseService;
import com.example.be.service.GuestService;
import com.example.be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/guest")
public class GuestController extends BaseController<Guest> {
    @Autowired
    private GuestService guestService;

    public GuestController(BaseService<Guest> baseService) {
        super(baseService);
    }

    @PutMapping("/{gid}/employee/{eid}")
    public Guest update(@PathVariable(value = "gid") long gid, @PathVariable(value = "eid") long eid,@RequestBody Guest guest, BindingResult bindingResult) {
        return guestService.update(gid, eid, guest, bindingResult);
    }

    // danh sach khach hang dang tu van
    @GetMapping("/find/{id}")
    public List<Guest> findGuestByEmployeeId(@PathVariable(value = "id") long id) {
        return guestService.findGuestByEmployeeId(id);
    }

    // danh sach khach hang chua tu van
    @GetMapping("/find")
    public List<Guest> findGuest() {
        return guestService.findGuest();
    }

    @PostMapping("/create")
    public Guest create(@RequestBody GuestRequest guestRequest, BindingResult bindingResult){
        return guestService.create(guestRequest, bindingResult);
    }
    @DeleteMapping("/{id}/delete/supporting")
    public void deleteSupporting(@PathVariable(value = "id") long id){
        guestService.deleteSupporting(id);
    }

}
