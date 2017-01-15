package com.gsafc.site.mapper;

import com.gsafc.site.model.information.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by dengb on 2016/12/29.
 */
@Component
public interface ParamMapper {

    @Select("SELECT NAME AS name, CODE AS code, DESCRIPTION AS description, SERIAL AS serial " +
            "FROM Param  WHERE lower(NAME) = lower(#{name}) AND lower(CODE) = lower(#{code})")
    Param findByNameAndCode(String name, String code);

    @Select("SELECT NAME AS name, CODE AS code, DESCRIPTION AS description, SERIAL AS serial " +
            "FROM Param WHERE lower(NAME) = lower(#{name})")
    List<Param> findByName(String name);
}
