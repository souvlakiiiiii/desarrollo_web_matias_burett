package com.proyectoweb.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table
public class Region {
    @Id
    @SequenceGenerator(
        name = "region_sequence",
        sequenceName = "region_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "region_sequence"
    )
    private Integer id;

    @NotNull
    @Column(length = 200)
    private String nombre;

}