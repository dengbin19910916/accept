package com.gsafc.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.xml.MarshallingHttpMessageConverter;
import org.springframework.oxm.Marshaller;
import org.springframework.oxm.Unmarshaller;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.beanvalidation.SpringValidatorAdapter;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.ThemeResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.theme.SessionThemeResolver;
import org.springframework.web.servlet.theme.ThemeChangeInterceptor;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ITemplateResolver;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created by dengb on 2016/12/19.
 */
@Configuration
@EnableWebMvc
@ComponentScan(
        basePackages = {"com.gsafc.site.web", "com.gsafc.exception.handler"},
        useDefaultFilters = false,
        includeFilters = @ComponentScan.Filter({Controller.class, ControllerAdvice.class, RestController.class})
)
@Import({CacheConfig.class})
public class WebConfig extends WebMvcConfigurerAdapter implements ApplicationContextAware {

    private ApplicationContext applicationContext;
    private final SpringValidatorAdapter validator;
    private final Marshaller marshaller;
    private final Unmarshaller unmarshaller;
    private final ObjectMapper objectMapper;
    private final Gson gson;

    @Autowired
    public WebConfig(SpringValidatorAdapter validator,
                     Marshaller marshaller, Unmarshaller unmarshaller,
                     ObjectMapper objectMapper, Gson gson) {
        this.validator = validator;
        this.marshaller = marshaller;
        this.unmarshaller = unmarshaller;
        this.objectMapper = objectMapper;
        this.gson = gson;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    @Bean
    public ViewResolver viewResolver() {
        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
        resolver.setTemplateEngine(templateEngine());
        resolver.setCharacterEncoding(StandardCharsets.UTF_8.name());
        return resolver;
    }

    @Bean
    public TemplateEngine templateEngine() {
        SpringTemplateEngine engine = new SpringTemplateEngine();
        engine.setEnableSpringELCompiler(true);
        engine.setTemplateResolver(templateResolver());
        return engine;
    }

    private ITemplateResolver templateResolver() {
        SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
        resolver.setCharacterEncoding(StandardCharsets.UTF_8.name());
        resolver.setApplicationContext(applicationContext);
        resolver.setTemplateMode(TemplateMode.HTML);
        resolver.setPrefix("/WEB-INF/pages/");
        resolver.setSuffix(".html");
        resolver.setCacheTTLMs(3600000L);
        return resolver;
    }

    @Bean
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }

    @Bean
    public LocaleResolver localResolver() {
        return new SessionLocaleResolver();
    }

    @Bean
    public ThemeResolver themeResolver() {
        SessionThemeResolver resolver = new SessionThemeResolver();
        resolver.setDefaultThemeName("default");
        return resolver;
    }

    @Bean
    public ThemeChangeInterceptor themeChangeInterceptor() {
        ThemeChangeInterceptor interceptor = new ThemeChangeInterceptor();
        interceptor.setParamName("theme");
        return interceptor;
    }

    @Bean
    public ThreadPoolTaskExecutor taskExecutor(){
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setQueueCapacity(100);
        executor.setMaxPoolSize(25);
        return executor;

    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new ByteArrayHttpMessageConverter());
        converters.add(new StringHttpMessageConverter(Charset.forName(StandardCharsets.UTF_8.name())));
        converters.add(new FormHttpMessageConverter());

//        FastJsonHttpMessageConverter4 fastjsonConverter = new FastJsonHttpMessageConverter4();
//        fastjsonConverter.setSupportedMediaTypes(Arrays.asList(
//                new MediaType("application", "json"),
//                new MediaType("text", "json")
//        ));
//        converters.add(fastjsonConverter);

//        FastJsonpHttpMessageConverter4 fastjsonpConverter = new FastJsonpHttpMessageConverter4();
//        fastjsonpConverter.setSupportedMediaTypes(Arrays.asList(
//                new MediaType("application", "json"),
//                new MediaType("text", "json")
//        ));
//        converters.add(fastjsonpConverter);


        MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter(objectMapper);
        jsonConverter.setSupportedMediaTypes(Arrays.asList(
                new MediaType("application", "json"),
                new MediaType("text", "json")
        ));
        converters.add(jsonConverter);

//        GsonHttpMessageConverter gsonConverter = new GsonHttpMessageConverter();
//        gsonConverter.setGson(gson);
//        converters.add(gsonConverter);

        MarshallingHttpMessageConverter xmlConverter = new MarshallingHttpMessageConverter(marshaller, unmarshaller);
        xmlConverter.setSupportedMediaTypes(Arrays.asList(
                new MediaType("application", "xml"),
                new MediaType("text", "xml")
        ));
        converters.add(xmlConverter);
    }

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        Map<String, MediaType> mediaTypes = new HashMap<>();
        mediaTypes.put("json", MediaType.APPLICATION_JSON);
        mediaTypes.put("xml", MediaType.APPLICATION_XML);
        configurer.mediaTypes(mediaTypes);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/resources/")
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.HOURS).cachePublic());
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Override
    public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
        super.configureAsyncSupport(configurer);
        configurer.setDefaultTimeout(30 * 1000);
        configurer.setTaskExecutor(taskExecutor());
    }

    @Override
    public SpringValidatorAdapter getValidator() {
        return validator;
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/","/login");
    }
}
