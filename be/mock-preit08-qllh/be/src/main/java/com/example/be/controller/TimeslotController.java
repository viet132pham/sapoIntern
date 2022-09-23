package com.example.be.controller;

import com.example.be.entity.Timeslot;
import com.example.be.service.BaseService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/timeslot")
public class TimeslotController extends BaseController<Timeslot>{
    public TimeslotController(BaseService<Timeslot> baseService) {
        super(baseService);
    }
}
