package com.gsafc.site.mapper;

import com.gsafc.site.model.country.City;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by dengb on 2016/12/29.
 */
@Component
public interface CityMapper {

    @Select("SELECT ID as id, CODE as code, PROVINCE_CODE as provinceCode, NAME as name FROM City")
    List<City> findAllCities();

    @Select("SELECT ID as id, CODE as code, PROVINCE_CODE as provinceCode, NAME as name FROM City WHERE CODE = #{code}")
    City findByCode(@Param("code") String code);

    @Select("SELECT ID as id, CODE as code, PROVINCE_CODE as provinceCode, NAME as name FROM City WHERE PROVINCE_CODE = #{provinceCode}")
    List<City> findByProvinceCode(@Param("provinceCode") String provinceCode);
}
