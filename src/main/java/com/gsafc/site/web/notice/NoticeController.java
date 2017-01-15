package com.gsafc.site.web.notice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Controller;

/**
 * Created by dengb on 2016/12/31.
 */
@Controller
public class NoticeController {

    private final ApplicationEventPublisher publisher;

    @Autowired
    public NoticeController(ApplicationEventPublisher publisher) {
        this.publisher = publisher;
    }
}
