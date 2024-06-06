package com.example.WebsiteDesign.Service;
import com.example.WebsiteDesign.Repository.UserRepository;

import com.example.WebsiteDesign.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserInfo> userDetail = repository.findByName(username);

        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    public String addUser(UserInfo userInfo) {
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        userInfo.setRoles("USER");
        userInfo.setName(userInfo.getEmail());
        repository.save(userInfo);
        return "User Added Successfully";

    }
    public UserInfo getUserById(Long id) {

        return repository.findById(id).orElse(null);
    }

    public List<UserInfo> getAllUser() {
        List<UserInfo> user = repository.findAll();
        return user;
    }

    public String updateUser(Long id, UserInfo updatedUserInfo) {
        Optional<UserInfo> optionalUser = repository.findById(id);
        if (optionalUser.isPresent()) {
            UserInfo existingUser = optionalUser.get();
            existingUser.setName(updatedUserInfo.getName());
            existingUser.setPassword(updatedUserInfo.getPassword());
            repository.save(existingUser);
            return "User updated successfully";
        } else {
            return null;
        }
    }
    public boolean deleteUser(Long id) {
        Optional<UserInfo> user = repository.findById(id);
        if (user.isPresent()) {
            repository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

}
