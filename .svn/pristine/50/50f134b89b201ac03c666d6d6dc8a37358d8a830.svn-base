package com.xlf.modules.sys.util;

public class AuthToken {
	
	private String token;
    private Integer expire;
    private Object userInfo;

    AuthToken(String token, Integer expire, Object userInfo) {
        this.token = token;
        this.expire = expire;
        this.userInfo = userInfo;
    }

    public static AuthToken.AuthTokenBuilder builder() {
        return new AuthToken.AuthTokenBuilder();
    }

    public String getToken() {
        return this.token;
    }

    public Integer getExpire() {
        return this.expire;
    }

    public Object getUserInfo() {
        return this.userInfo;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setExpire(Integer expire) {
        this.expire = expire;
    }

    public void setUserInfo(Object userInfo) {
        this.userInfo = userInfo;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof AuthToken)) {
            return false;
        } else {
            AuthToken other = (AuthToken)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                label47: {
                    Object this$token = this.getToken();
                    Object other$token = other.getToken();
                    if (this$token == null) {
                        if (other$token == null) {
                            break label47;
                        }
                    } else if (this$token.equals(other$token)) {
                        break label47;
                    }

                    return false;
                }

                Object this$expire = this.getExpire();
                Object other$expire = other.getExpire();
                if (this$expire == null) {
                    if (other$expire != null) {
                        return false;
                    }
                } else if (!this$expire.equals(other$expire)) {
                    return false;
                }

                Object this$userInfo = this.getUserInfo();
                Object other$userInfo = other.getUserInfo();
                if (this$userInfo == null) {
                    if (other$userInfo != null) {
                        return false;
                    }
                } else if (!this$userInfo.equals(other$userInfo)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof AuthToken;
    }
//
//    public int hashCode() {
//        int PRIME = true;
//        int result = 1;
//        Object $token = this.getToken();
//        int result = result * 59 + ($token == null ? 43 : $token.hashCode());
//        Object $expire = this.getExpire();
//        result = result * 59 + ($expire == null ? 43 : $expire.hashCode());
//        Object $userInfo = this.getUserInfo();
//        result = result * 59 + ($userInfo == null ? 43 : $userInfo.hashCode());
//        return result;
//    }

    public String toString() {
        return "AuthToken(token=" + this.getToken() + ", expire=" + this.getExpire() + ", userInfo=" + this.getUserInfo() + ")";
    }

    public static class AuthTokenBuilder {
        private String token;
        private Integer expire;
        private Object userInfo;

        AuthTokenBuilder() {
        }

        public AuthToken.AuthTokenBuilder token(String token) {
            this.token = token;
            return this;
        }

        public AuthToken.AuthTokenBuilder expire(Integer expire) {
            this.expire = expire;
            return this;
        }

        public AuthToken.AuthTokenBuilder userInfo(Object userInfo) {
            this.userInfo = userInfo;
            return this;
        }

        public AuthToken build() {
            return new AuthToken(this.token, this.expire, this.userInfo);
        }

        public String toString() {
            return "AuthToken.AuthTokenBuilder(token=" + this.token + ", expire=" + this.expire + ", userInfo=" + this.userInfo + ")";
        }
    }
}
