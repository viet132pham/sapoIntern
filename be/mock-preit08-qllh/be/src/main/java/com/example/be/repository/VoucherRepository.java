package com.example.be.repository;

import com.example.be.entity.Document;
import com.example.be.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface VoucherRepository extends BaseRepository<Voucher, Long> {
    Voucher findVoucherById (long id);

    @Query(value = "select * from voucher where created_at between :start and :end", nativeQuery = true)
    List<Voucher> findVoucherInPeriod(String start, String end);
}
