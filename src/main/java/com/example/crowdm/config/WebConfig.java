package com.example.crowdm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesView;
import org.springframework.web.servlet.view.tiles3.TilesViewResolver;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {
//    @Bean(name="tilesConfigure")
//    public TilesConfigurer tilesConfigurer() {
//        final TilesConfigurer configurer = new TilesConfigurer();
//        configurer.setDefinitions(new String[] {
//                "/WEB-INF/tiles/tiles.xml"
//        });
//        configurer.setCheckRefresh(true);
//        return configurer;
//    }
//    @Bean(name="viewResolver")
//    public TilesViewResolver tilesViewResolver() {
//        final TilesViewResolver tilesViewResolver = new TilesViewResolver();
//        tilesViewResolver.setViewClass(TilesView.class);
//        tilesViewResolver.setOrder(1);
//        return tilesViewResolver;
//    }
//
//    public void addResourcesHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/static/**")
//                .addResourceLocations("classpath:/static/")
//                .setCachePeriod(20);
//    }

    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        StringHttpMessageConverter converter = new StringHttpMessageConverter(StandardCharsets.UTF_8);
        converter.setWriteAcceptCharset(false); //이거 설정 안하면 Accept-Charset에 대다수의 Encoding Type 리턴함
        converters.add(converter);

        WebMvcConfigurer.super.configureMessageConverters(converters);
    }

    //POST
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:3000")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3000);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/", "file:/opt/tomcat/webapps/crowdM/static/");
    }
}

