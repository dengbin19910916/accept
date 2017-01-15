package com.gsafc.site.mapper;

import com.gsafc.site.model.country.Province;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by dengb on 2016/12/29.
 */
@Component
public interface ProvinceMapper {

    @Select("SELECT ID, CODE, NAME FROM Province")
    List<Province> findAllProvinces();

    @Select("SELECT ID, CODE, NAME FROM Province WHERE CODE = #{code}")
    Province findByCode(@Param("code") String code);
}
