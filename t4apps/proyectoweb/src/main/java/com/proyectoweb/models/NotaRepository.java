package com.proyectoweb.models;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Integer> {
    List<Nota> findByAvisoId(Integer avisoId);

    @Query("SELECT AVG(n.nota) FROM Nota n WHERE n.aviso.id = :avisoId")
    Double calcularPromedio(Integer avisoId);
}