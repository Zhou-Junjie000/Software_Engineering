package com.example.springboot.controller;


import com.example.springboot.UserService.UserService;
import com.example.springboot.entity.User;
import com.example.springboot.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserService userService;

//    查询所以数据
    @GetMapping
    public List<User> index(){
        return userMapper.findAll();
    }

    @DeleteMapping("/{id}")
    public Integer delete(@PathVariable Integer id){
         return userMapper.deleteById(id);
    }

//    增加和修改
    @PostMapping
    public boolean save(@RequestBody User user){

        return userService.saveOrUpdate(user);
    }

    @GetMapping("/page")
    public Map<String, Object> findPage(@RequestParam String username,@RequestParam Integer pageNum, @RequestParam Integer pageSize){

        pageNum = (pageNum -1)*pageSize;
        username = "%" + username + "%";
        List<User> data = userMapper.selectPage(pageNum,pageSize,username);
        Integer total = userMapper.selectTotal(username);
        Map<String,Object> res = new HashMap<>();

        res.put("data",data);
        res.put("total",total);
        return res;

    }


}
