package com.gsafc.site.data.information;

import com.gsafc.site.model.information.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Map;

/**
 * Created by dengb on 2016/12/23.
 */
@Repository
public class ParamRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ParamRepository(JdbcTemplate jdbcTemplate) {
        Assert.notNull(jdbcTemplate);
        this.jdbcTemplate = jdbcTemplate;
    }

    public Param findByNameAndCode(String name, String code) {
        return jdbcTemplate.queryForObject("SELECT * FROM Param " +
                        "WHERE lower(NAME) = lower(?) AND lower(CODE) = lower(?)",
                (rs, rowNum) -> {
                    Param param = new Param();
                    param.setName(rs.getString("name"));
                    param.setCode(rs.getString("code"));
                    param.setDescription(rs.getString("description"));
                    param.setSerial(rs.getInt("serial"));
                    return param;
                }, name, code);
    }

    public List<Map<String, Object>> findByName(String name) {
        return jdbcTemplate.queryForList("SELECT * FROM Param WHERE lower(NAME) = lower(?)", name);
    }
}
