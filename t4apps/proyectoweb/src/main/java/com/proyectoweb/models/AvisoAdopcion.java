package com.proyectoweb.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.time.LocalDateTime;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import com.proyectoweb.models.TipoAnimal;
import com.proyectoweb.models.UnidadMedida;

@Entity
@Table(name = "aviso_adopcion")
public class AvisoAdopcion {
    @Id
    @SequenceGenerator(
        name = "avisoadopcion_sequence",
        sequenceName = "avisoadopcion_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "avisoadopcion_sequence"
    )
    private Integer id;

    @NotNull
    private LocalDateTime fecha_ingreso;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comuna_id", nullable = false)
    private Comuna comuna;

    @NotNull
    @Column(length=100)
    private String sector;

    @NotNull
    @Column(length=200)
    private String nombre;

    @NotNull
    @Column(length=100)
    private String email;

    @Column(length=15)
    private String celular;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoAnimal tipo;

    @NotNull
    private Integer cantidad;

    @NotNull
    private Integer edad;

    @NotNull
    @Enumerated(EnumType.STRING)
    private UnidadMedida unidad_medida;

    @NotNull
    private LocalDateTime fecha_entrega;

    private String descripcion;

    public AvisoAdopcion(){
    }

    public AvisoAdopcion(LocalDateTime fecha_ingreso, Comuna comuna_id, String sector, String nombre, String email, String celular,
    TipoAnimal tipo, Integer cantidad, Integer edad, UnidadMedida unidad_medida, LocalDateTime fecha_entrega, String description){
        this.fecha_ingreso=fecha_ingreso;
        this.comuna = comuna_id;
        this.sector = sector;
        this.nombre = nombre;
        this.email = email;
        this.celular = celular;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.edad = edad;
        this.unidad_medida = unidad_medida;
        this.fecha_entrega = fecha_entrega;
        this.descripcion = descripcion;
    }

    public Integer getId(){return id;}
    public LocalDateTime getFechaIngreso(){return fecha_ingreso;}
    public Comuna getComuna(){return comuna;}
    public String getSector(){return sector;}
    public String getEmail(){return email;}
    public String getCelular(){return celular;}
    public TipoAnimal getTipo(){return tipo;}
    public Integer getCantidad(){return cantidad;}
    public Integer getEdad(){return edad;}
    public UnidadMedida getUnidadMedida(){return unidad_medida;}
    public LocalDateTime getFechaEntrega(){return fecha_entrega;}
    public String getDescripcion(){return descripcion;}
}
