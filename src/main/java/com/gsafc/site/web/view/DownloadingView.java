package com.gsafc.site.web.view;

import org.springframework.web.servlet.View;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * 文件下载视图。
 *
 * @author dengb
 * @see org.springframework.web.servlet.View
 * Created by dengb on 2017/1/2.
 */
public class DownloadingView implements View {

    private final String filename;
    private final String contentType;
    private final byte[] contents;

    public DownloadingView(String filename, String contentType, byte[] contents) {
        this.filename = filename;
        this.contentType = contentType;
        this.contents = contents;
    }

    @Override
    public String getContentType() {
        return contentType;
    }

    @Override
    public void render(Map<String, ?> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        response.setHeader("Content-Disposition", "attachment; filename=" + filename);
        ServletOutputStream stream = response.getOutputStream();
        stream.write(contents);
    }
}
