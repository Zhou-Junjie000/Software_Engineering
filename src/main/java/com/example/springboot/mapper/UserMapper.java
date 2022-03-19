package com.example.springboot.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.springboot.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

//@Mapper
public interface UserMapper extends BaseMapper<User> {

    @Select("SELECT * from User")
    List<User> findAll();

    @Insert("INSERT into User(username,password,email,phone) VALUES (#{username}, " +
            "#{password}, #{email}, #{phone})")
    int insert(User user);


    int update(User user);

    @Delete("delete from User where id = #{id}")
    Integer deleteById(@Param("id") Integer id);


    @Select("select * from User where username like #{username} limit #{pageNum}, #{pageSize}")
    List<User> selectPage(Integer pageNum, Integer pageSize,String username);


//    返回表中的总的条数
    @Select("select count(*) from User where username like concat('%', #{username}, '%')")
    Integer selectTotal(String username);
}
