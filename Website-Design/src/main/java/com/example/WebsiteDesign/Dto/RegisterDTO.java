package com.example.WebsiteDesign.Dto;


import lombok.*;

@Setter
@Data
@Getter
@AllArgsConstructor

@NoArgsConstructor
public class RegisterDTO {
    private String name;
    private String username;
    private String password;
    private  String age;
}
