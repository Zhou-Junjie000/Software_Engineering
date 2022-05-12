package com.xlf.modules.sys.util;

import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;

import lombok.Data;
@Data
public class Oauth2Token extends UsernamePasswordToken implements AuthenticationToken{
	private String token;

    public Oauth2Token(String token) {
        this.token = token;
    }

    public String getPrincipal() {
        return this.token;
    }

    public Object getCredentials() {
        return this.token;
    }
}
