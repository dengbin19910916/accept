package com.gsafc.site.data.information;

import com.gsafc.site.model.country.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Map;

/**
 * Created by dengb on 2016/12/20.
 */
@Repository
public class CityRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CityRepository(JdbcTemplate jdbcTemplate) {
        Assert.notNull(jdbcTemplate);
        this.jdbcTemplate = jdbcTemplate;
    }


    public List<Map<String, Object>> findAllCities() {
        return jdbcTemplate.queryForList("SELECT * FROM City");
    }

    public City findByCode(String code) {
        return jdbcTemplate.queryForObject("SELECT ID, CODE, PROVINCE_CODE, NAME FROM City WHERE CODE = ?",
                (rs, rowNum) -> {
                    City city = new City();
                    city.setId(rs.getLong("id"));
                    city.setCode(rs.getString("code"));
                    city.setProvinceCode(rs.getString("province_code"));
                    city.setName(rs.getString("name"));
                    return city;
                }, code);
    }

    public List<Map<String, Object>> findByProvinceCode(String provinceCode) {
        return jdbcTemplate.queryForList("SELECT ID, CODE, PROVINCE_CODE, NAME FROM City WHERE PROVINCE_CODE = ?", provinceCode);
    }

}
