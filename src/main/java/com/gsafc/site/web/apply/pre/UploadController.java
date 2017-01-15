package com.gsafc.site.web.apply.pre;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Created by dengb on 2016/12/24.
 */
@Controller
@RequestMapping("/apply/image")
public class UploadController {

    @GetMapping({"/", "/index"})
    public String index(Model model) {
        model.addAttribute("file1", "文件1");
        model.addAttribute("file2", "文件2");
        model.addAttribute("file3", "文件3");
        return "apply/image/index";
    }

    @PostMapping("/submit")
    @ResponseBody
    public String submit(@RequestParam(value = "files", required = false) MultipartFile file) throws IOException {
        if (file.getSize() > 1024 * 1024)
            throw new IOException("文件过大");

        Path path = Paths.get("C:\\WorkSpace\\IdeaProjects\\temp\\uploads");
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
        Path filepath = Paths.get(path.toString(), file.getOriginalFilename());
        if (!Files.exists(filepath)) {
            Files.createFile(filepath);
        }
        Files.write(filepath, file.getBytes());
        return "success";
    }
}
