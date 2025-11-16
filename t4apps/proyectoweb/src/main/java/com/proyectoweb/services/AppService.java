package com.proyectoweb.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import com.proyectoweb.models.AvisoAdopcion;
import com.proyectoweb.models.NotaRepository;
import com.proyectoweb.models.AvisoAdopcionRepository;

@Service
public class AppService {

    private final AvisoAdopcionRepository avisoRepo;
    private final NotaRepository notaRepo;

    public AppService(AvisoAdopcionRepository avisoRepo, NotaRepository notaRepo){
        this.avisoRepo = avisoRepo;
        this.notaRepo = notaRepo;
    }

    public List<Map<String, Object>> obtenerTablaAvisos(){
        List<AvisoAdopcion> avisos = avisoRepo.findAll();
        List<Map<String, Object>> datos = new ArrayList<>();

        for (AvisoAdopcion aviso: avisos){
            Map<String, Object> fila = new HashMap<>();

            fila.put("id", aviso.getId());
            fila.put("fecha", aviso.getFechaIngreso());
            fila.put("sector", aviso.getSector());
            fila.put("cantidad", aviso.getCantidad());
            fila.put("tipo", aviso.getTipo());
            fila.put("edad", aviso.getEdad());
            fila.put("umedida", aviso.getUnidadMedida());
            fila.put("comuna", aviso.getComuna());
            Double promedio = notaRepo.calcularPromedio(aviso.getId());
            String promedioStr;
            if(promedio==null){
                promedioStr = "-";
            }else{
                promedioStr = String.format("%.1f", promedio);
            }
            fila.put("nota", promedioStr);

            datos.add(fila);
        }
        return datos;
    }
}
