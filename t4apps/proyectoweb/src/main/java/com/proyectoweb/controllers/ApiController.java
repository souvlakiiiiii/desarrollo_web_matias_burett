package com.proyectoweb.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.proyectoweb.services.ApiService;

import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class ApiController {
    private final ApiService apiService;
    public ApiController(ApiService apiService) {
        this.apiService = apiService;

    }
    
    @PostMapping("/avisos/{id}/notas")
    public Double agregarNota(@PathVariable Integer id, @RequestBody Map<String, Integer> body){
        int nota = body.get("nota");
        apiService.agregarNota(id, nota);
        return apiService.promedio(id);
    }
}
