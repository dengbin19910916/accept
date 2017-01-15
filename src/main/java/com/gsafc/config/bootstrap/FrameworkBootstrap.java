package com.gsafc.config.bootstrap;

import com.gsafc.config.RootConfig;
import com.gsafc.config.WebConfig;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.core.annotation.Order;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.Filter;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletRegistration;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Created by dengb on 2016/12/19.
 */
@Order(1)
public class FrameworkBootstrap extends AbstractAnnotationConfigDispatcherServletInitializer {

    private static final Logger log = LogManager.getLogger();

    private static final long MB = 1024 * 1024;
    /**
     * Temporary location where files will be stored.
     */
    private static final String LOCATION = "/temp/uploads";
    /**
     * Max file size. Beyond that size spring will throw exception.
     */
    private static final long MAX_FILE_SIZE = 5 * MB;
    /**
     * Total request size containing Multi part.
     */
    private static final long MAX_REQUEST_SIZE = 20 * MB;
    /**
     * Size threshold after which files will be written to disk.
     */
    private static final int FILE_SIZE_THRESHOLD = 0;


    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[]{RootConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{WebConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    protected Filter[] getServletFilters() {
        return new Filter[]{
                new CharacterEncodingFilter(StandardCharsets.UTF_8.name())
        };
    }

    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {
        Path path = Paths.get(System.getProperty("user.dir"), LOCATION);
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                log.warn("create upload location failed.");
            }
        }
        MultipartConfigElement multipartConfigElement =
                new MultipartConfigElement(path.toString(), MAX_FILE_SIZE, MAX_REQUEST_SIZE, FILE_SIZE_THRESHOLD);
        registration.setMultipartConfig(multipartConfigElement);
    }
}
