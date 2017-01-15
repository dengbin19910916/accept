package com.gsafc.site.data.information;

import com.gsafc.site.model.country.Province;
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
public class ProvinceRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProvinceRepository(JdbcTemplate jdbcTemplate) {
        Assert.notNull(jdbcTemplate);
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> findAllProvinces() {
        return jdbcTemplate.queryForList("SELECT ID, CODE, NAME FROM Province");
    }

    public Province findByCode(String code) {
        return jdbcTemplate.queryForObject("SELECT ID, CODE, NAME FROM Province WHERE CODE = ?",
                (rs, rowNum) -> {
                    Province province = new Province();
                    province.setId(rs.getLong("id"));
                    province.setCode(rs.getString("code"));
                    province.setName(rs.getString("name"));
                    return province;
                }, code);
    }
}
