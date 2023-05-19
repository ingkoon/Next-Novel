//package com.a509.service_member.jpa.oauth;
//
//import java.util.Map;
//
//public class GoogleUserInfo implements OAuth2UserInfo {
//
//    private Map<String, Object> attributes;
//
//    public GoogleUserInfo(Map<String, Object> attributes) {
//        this.attributes = attributes;
//    }
//
//    @Override
//    public String getProviderId() {
//        return (String)attributes.get("sub");
//    }
//
//    @Override
//    public String getProvider() {
//        return "google";
//    }
//
//    @Override
//    public String getEmail() {
//        return (String)attributes.get("email");
//    }
//
//    @Override
//    public String getNickName() {
//        return (String)attributes.get("nickName");
//    }
//
//    @Override
//    public String getProfileImage() {
//        return (String)attributes.get("picture");
//    }
//}
