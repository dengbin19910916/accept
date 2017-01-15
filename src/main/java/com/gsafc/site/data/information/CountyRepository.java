package com.gsafc.site.data.information;

import com.gsafc.site.model.country.County;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Map;

/**
 * Created by dengb on 2016/12/22.
 */
@Repository
public class CountyRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CountyRepository(JdbcTemplate jdbcTemplate) {
        Assert.notNull(jdbcTemplate);
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> findAllCounties() {
        return jdbcTemplate.queryForList("SELECT * FROM County");
    }

    public County findByCode(String code) {
        return jdbcTemplate.queryForObject("SELECT ID, CODE, PROVINCE_CODE, CITY_CODE, NAME FROM County WHERE CODE = ?",
                (rs, rowNum) -> {
                    County county = new County();
                    county.setId(rs.getLong("id"));
                    county.setCode(rs.getString("code"));
                    county.setProvinceCode(rs.getString("province_code"));
                    county.setCityCode(rs.getString("city_code"));
                    county.setName(rs.getString("name"));
                    return county;
                }, code);
    }

    public List<Map<String, Object>> findByCityCode(String cityCode) {
        return jdbcTemplate.queryForList("SELECT ID, CODE, PROVINCE_CODE, CITY_CODE, NAME FROM County WHERE CITY_CODE = ?", cityCode);
    }
}
