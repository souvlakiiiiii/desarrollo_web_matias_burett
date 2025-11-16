package com.proyectoweb.services;

import org.springframework.stereotype.Service;

import com.proyectoweb.models.NotaRepository;
import com.proyectoweb.models.AvisoAdopcionRepository;
import com.proyectoweb.models.Nota;
import com.proyectoweb.models.AvisoAdopcion;

@Service
public class ApiService{
    private final AvisoAdopcionRepository avisoRepo;
    private final NotaRepository notaRepo;
    
    public ApiService(AvisoAdopcionRepository avisoR, NotaRepository notaR){
        this.avisoRepo = avisoR;
        this.notaRepo = notaR;
    }

    public Nota agregarNota(Integer avisoId, Integer nota) {
        AvisoAdopcion aviso = avisoRepo.findById(avisoId).orElseThrow(() -> new IllegalArgumentException("Aviso no encontrado"));

        Nota nuevaNota = new Nota(aviso, nota);
        return notaRepo.save(nuevaNota);
    }

    public Double promedio(Integer aviso_id){
        Double prom = notaRepo.calcularPromedio(aviso_id);
        return prom;
    }

}

