package com.gsafc.site.model.country;

import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by dengb on 2016/12/20.
 */
@Component
@XmlRootElement
public class City {

    private long id;
    private String code;            // 市代码
    private String provinceCode;    // 省代码
    private String name;            // 市名称

    public City() {
        super();
    }

    public City(long id, String code, String provinceCode ,String name) {
        this.id = id;
        this.code = code;
        this.provinceCode = provinceCode;
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
    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
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
        return "City{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", provinceCode='" + provinceCode + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
