package com.gsafc.site.model.country;

import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by dengb on 2016/12/20.
 */
@Component
@XmlRootElement
public class Province {

    private long id;
    private String code;    // 省代码
    private String name;    // 省名称

    public Province() {
        super();
    }

    public Province(long id, String code, String name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }

    @XmlElement
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @XmlElement
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @XmlElement
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Province{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
