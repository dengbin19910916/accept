package com.gsafc.site.web.notice;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

/**
 * Created by dengb on 2017/1/2.
 */
@Controller
@RequestMapping("/file")
public class FileController {

    @RequestMapping("quotes")
    @ResponseBody
    public DeferredResult<String> quotes() {
        DeferredResult<String> deferredResult = new DeferredResult<>();
        setData(deferredResult);
        return deferredResult;
    }

    private void setData(DeferredResult<String> result) {
        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        result.setResult("hello");
    }


    @PostMapping
    public Callable<String> processUpload(final MultipartFile file) {

        return new Callable<String>() {
            public String call() throws Exception {
                return null;
            }
        };

    }
}
