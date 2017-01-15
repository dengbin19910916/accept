package com.gsafc.site.model.country;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by dengb on 2016/12/22.
 */
@XmlRootElement
public class County {

    private long id;
    private String code;            // 县代码
    private String provinceCode;    // 省代码
    private String cityCode;        // 市代码
    private String name;            // 市名称

    public County() {
        super();
    }

    public County(long id, String code, String provinceCode, String cityCode, String name) {
        this.id = id;
        this.code = code;
        this.provinceCode = provinceCode;
        this.cityCode = cityCode;
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
    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
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
        return "County{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", provinceCode='" + provinceCode + '\'' +
                ", cityCode='" + cityCode + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
