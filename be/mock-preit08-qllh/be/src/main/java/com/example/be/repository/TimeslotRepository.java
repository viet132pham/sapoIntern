package com.example.be.repository;

import com.example.be.entity.Department;
import com.example.be.entity.Timeslot;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeslotRepository extends BaseRepository<Timeslot, Long>{
    Timeslot findTimeslotById (long id);
}
