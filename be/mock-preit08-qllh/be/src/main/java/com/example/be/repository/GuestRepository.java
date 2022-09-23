package com.example.be.repository;

import com.example.be.entity.Guest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestRepository extends BaseRepository<Guest, Long>{

    //danh sach khach hang dang tu van
    @Modifying
    @Query(value = "SELECT * FROM guest where employee_id=:id", nativeQuery = true)
    List<Guest> findGuestByEmployeesId(long id);

    //danh sach khach hang chua tu van
    @Modifying
    @Query(value = "SELECT * FROM guest where employee_id is null", nativeQuery = true)
    List<Guest> findGuest();
}
