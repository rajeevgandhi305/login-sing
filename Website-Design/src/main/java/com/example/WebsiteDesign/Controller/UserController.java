package com.example.WebsiteDesign.Controller;

import com.example.WebsiteDesign.Dto.LoginDTO;
import com.example.WebsiteDesign.Jwt.JwtService;
import com.example.WebsiteDesign.Service.UserInfoService;
import com.example.WebsiteDesign.model.UserInfo;

import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserInfoService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

        @PostMapping("/register")
    public ResponseEntity<String> addNewUser(@RequestBody UserInfo userInfo) {
        try {
            String result = userService.addUser(userInfo);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add user");
        }
    }

//    @PostMapping("/login")
//    @PermitAll
//    public ResponseEntity<String> authenticateAndGetToken(@RequestBody LoginDTO authRequest) {
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
//            if (authentication.isAuthenticated()) {
//                String token = jwtService.generateToken(authRequest.getUsername());
//                return ResponseEntity.ok(token);
//            } else {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//            }
//        } catch (UsernameNotFoundException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed");
//        }
//    }
@PostMapping("/login")
@PermitAll
public ResponseEntity<String> authenticateAndGetToken(@RequestBody LoginDTO authRequest) {
    try {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(authRequest.getUsername());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    } catch (UsernameNotFoundException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed");
    }
}


    @GetMapping("/user/{id}")
    @PermitAll
    public ResponseEntity<UserInfo> getUserById(@PathVariable Long id) {
        UserInfo user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getallUser")
    @PermitAll
    public ResponseEntity<List<UserInfo>> getAllUser() {
        List<UserInfo> users = userService.getAllUser();
        return ResponseEntity.ok(users);
    }

                @PutMapping("/update/{id}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> updateUser(@PathVariable("id") Long id, @RequestBody UserInfo updatedUserInfo) {
        try {
            String result = userService.updateUser(id, updatedUserInfo);
            if (result != null) {
                return ResponseEntity.ok("Update successful");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update failed");
        }
    }
    @DeleteMapping("/delete/{id}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> deleteUserInfo(@PathVariable("id") Long id) {
        try {
            boolean deleted = userService.deleteUser(id);
            if (deleted) {
                return ResponseEntity.ok("User deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user");
        }
    }


}
