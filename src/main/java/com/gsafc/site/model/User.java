package com.gsafc.site.model;

import org.springframework.stereotype.Component;

/**
 * Created by dengb on 2016/12/19.
 */
@Component
public class User {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                '}';
    }
}
