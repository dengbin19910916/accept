package com.gsafc.site.mapper;

import com.gsafc.site.model.country.County;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by dengb on 2016/12/29.
 */
@Component
public interface CountyMapper {

    @Select("SELECT ID as id, CODE as code, PROVINCE_CODE as provinceCode, CITY_CODE as cityCode, NAME as name FROM County")
    List<County> findAllCounties();

    @Select("SELECT ID as id, CODE as code, PROVINCE_CODE as provinceCode, CITY_CODE as cityCode, NAME as name FROM County WHERE CODE = #{code}")
    County findByCode(@Param("code") String code);

    @Select("SELECT SELECT ID as id, CODE as code, PROVINCE_CODE as provinceCode, CITY_CODE as cityCode, NAME as name FROM County WHERE CITY_CODE = #{cityCode}")
    List<County> findByCityCode(@Param("cityCode") String cityCode);
}
