package com.proyectoweb.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import  com.proyectoweb.services.AppService;

@Controller
public class AppController {
    private final AppService appService;
    public AppController(AppService appService) {
        this.appService = appService;
    }
    
    @GetMapping("/")
    public String avisos(Model model) {
         var data = appService.obtenerTablaAvisos();
        System.out.println("Cantidad avisos: " + data.size()); // Debug
        model.addAttribute("avisos", appService.obtenerTablaAvisos());
        return "listado";
    }
}