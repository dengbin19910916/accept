package com.gsafc.exception.handler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;

import java.lang.reflect.Method;

/**
 * Created by dengb on 2017/1/2.
 */
public class AsyncExceptionHandler implements AsyncUncaughtExceptionHandler {

    private static final Logger log = LogManager.getLogger();

    @Override
    public void handleUncaughtException(Throwable ex, Method method, Object... params) {
        log.error("Exception message - " + ex.getMessage());
        log.error("Method name - " + method.getName());
        for (Object param : params) {
            log.error("Parameter value - " + param);
        }
    }
}
