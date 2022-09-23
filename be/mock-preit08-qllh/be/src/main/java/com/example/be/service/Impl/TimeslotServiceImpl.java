package com.example.be.service.Impl;

import com.example.be.entity.Timeslot;
import com.example.be.repository.BaseRepository;
import com.example.be.service.TimeslotService;
import com.example.be.util.Utils;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class TimeslotServiceImpl extends BaseServiceImpl<Timeslot> implements TimeslotService {
    public TimeslotServiceImpl(BaseRepository<Timeslot, Long> baseRepo, Utils utils) {
        super(baseRepo, utils);
    }
}
