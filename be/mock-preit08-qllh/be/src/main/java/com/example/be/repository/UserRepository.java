package com.example.be.repository;

import com.example.be.entity.Role;
import com.example.be.entity.User;

import com.example.be.response.EmployeeResponse;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends BaseRepository<User, Long>{
    List<User> findUserByRoles(Role role);
    User findUserById(long id);
    @Modifying
    @Query(value = "delete from user_role where user_id=:uid and role_id=:rid", nativeQuery = true)
    void deleteUserRole(long uid, long rid);

    @Modifying
    @Query(value = "select * from user where username=:username", nativeQuery = true)
    List<User> findUserByUsername(String username);

    // truy van best nhan vien
    @Modifying
    @Query(value = "select u.full_name as fullName, sum(amount) as totalAmount, count(v.id) as voucherCount into employeeResponse\n" +
            "from payment_voucher pv join user u on pv.employee_id = u.id left join voucher v on pv.voucher_id = v.id \n" +
            "where v.status = 'COMPLETED' and v.created_at >= date_add(current_timestamp(),interval -30 day) and v.created_at <= current_timestamp()\n" +
            "group by pv.employee_id order by totalAmount desc limit 1", nativeQuery = true)
    List<EmployeeResponse> findBestEmployee();
}