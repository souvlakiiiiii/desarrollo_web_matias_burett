from flask import Flask, request, render_template, redirect, url_for, flash
from database.db import SessionLocal
from database.db import get_5_avisos, get_foto_by_aviso, create_foto, create_aviso_get_id, create_contactar_por, get_all_fotos_by_aviso_numero, get_aviso_by_id, get_foto_by_aviso, get_contacto_by_aviso, get_avisos_paginados, contar_avisos, get_all_fotos_by_aviso_numero, get_all_fotos_by_aviso
from database.db import get_fechaent_by_id, get_fechapub_by_id, get_sector_by_id, get_region_by_id, get_nombre_by_id, get_aviso_id, get_contacto_by_id, get_comuna_by_id, get_cantidad_by_id, get_tipo_by_id, get_edad_by_id, get_uedad_by_id, get_all_regiones, get_all_comunas, get_comuna_by_region
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os
from datetime import datetime
import re

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

if __name__=="__main__":
    app.run(debug=True)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000
email_re=r"^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$"
cel_re = r"^\+569\d{8}$"
fecha_re = r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$"
current_aviso_id=""

def valida_int(nro):
    if "." in nro:
        return False
    else:
        return True
    
def validar_imagen_mime(file_storage):
    if not file_storage.filename:
        return False
        
    extensiones_permitidas = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'}
    ext = os.path.splitext(file_storage.filename)[1].lower()
    return ext in extensiones_permitidas

def validar_input(region, comuna, sector, nombre, email, ncel, url, tipo, ctad, edad, uedad, fecha_ent, fotos, contactos_data=None):
    condiciones = {
        'region': region != None,
        'comuna': comuna != None,
        'sector_len': (sector==None or sector=="") or (len(sector) >= 0 and len(sector) <= 100),
        'nombre_len': len(nombre) >= 3 and len(nombre) <= 200,
        'email_valido': len(email) > 0 and len(email) <= 100 and re.search(email_re, email),
        'celular_valido': (ncel==None or ncel=="") or (len(ncel) == 12 and re.search(cel_re, ncel)),
        'url_len': len(url) >= 4 and len(url) <= 50,
        'tipo': tipo != None,
        'cantidad_valida': ctad != None and valida_int(ctad) and int(ctad) >= 1,
        'edad_valida': edad != None and valida_int(edad) and int(edad) >= 1,
        'uedad': uedad != None,
        'fecha_valida': re.search(fecha_re, fecha_ent) and fecha_ent != None,
        'fotos_cantidad': len(fotos) <= 5 and len(fotos) > 0,
        'fotos_mime': all(validar_imagen_mime(foto) for foto in fotos)
    }
    
    # Validación para todos los contactos
    if contactos_data:
        condiciones['contactos_minimo'] = len(contactos_data) >= 1
        condiciones['contactos_urls_validas'] = all(
            len(contacto['valor']) >= 4 and len(contacto['valor']) <= 50 
            for contacto in contactos_data
        )
        condiciones['contactos_tipos_validos'] = all(
            contacto['tipo'] and contacto['tipo'] != "vacio" 
            for contacto in contactos_data
        )
    
    return all(condiciones.values())
    
@app.route("/")
def index():
    session_db=SessionLocal()
    avisos=get_5_avisos()

    lista=[]
    for aviso in avisos:
        comuna_obj = aviso.comuna
        foto_obj = get_foto_by_aviso(aviso.id)

        id=aviso.id
        foto=foto_obj
        edad=aviso.edad
        tipo=aviso.tipo
        cantidad=aviso.cantidad
        uedad=aviso.unidad_medida
        comuna=comuna_obj
        sector=aviso.sector
        fecha=aviso.fecha_ingreso
        
        dato={
            'aviso': aviso,
            'fecha_pub': fecha,
            'foto': foto,
            'comuna': comuna,
            'cantidad': cantidad,
            'uedad':uedad,
            'edad':edad,
            'tipo': tipo,
            'sector': sector,
        }

        lista.append(dato)
    session_db.close()
    return render_template("index.html", datos=lista)

@app.route("/listado")
@app.route("/listado/<int:pagina>")
def listado(pagina=1):
    avisosPorPagina=5
    offset=(pagina-1)*avisosPorPagina
    session_db=SessionLocal()
    avisos=get_avisos_paginados(pagina)
    total_avisos = contar_avisos()
    total_paginas = (total_avisos + 4) // 5

    listaListado=[]

    if not avisos:
        session_db.close()
        return render_template("listado.html", datos=listaListado, paginaActual=pagina, totalPaginas=total_paginas, mensaje="No hay avisos de adopción disponibles")
    
    for aviso in avisos:
        id=aviso.id
        edad=aviso.edad
        tipo=aviso.tipo
        cantidad=aviso.cantidad
        uedad=aviso.unidad_medida
        comuna=aviso.comuna
        sector=aviso.sector
        fecha=aviso.fecha_ingreso
        fechaf=aviso.fecha_entrega
        nombre=aviso.nombre
        nro_fotos=get_all_fotos_by_aviso_numero(id)

        dato={
            'aviso': aviso,
            'fecha_pub': fecha,
            'fecha_ent': fechaf,
            'comuna': comuna,
            'cantidad': cantidad,
            'uedad':uedad,
            'edad':edad,
            'tipo': tipo,
            'nombre': nombre,
            'sector': sector,
            'nro_fotos': nro_fotos
        }

        listaListado.append(dato)
    session_db.close()
    return render_template("listado.html", datos=listaListado, paginaActual=pagina, totalPaginas=total_paginas)

@app.route("/mascota/<int:aviso_id>")
def mascota(aviso_id):
    aviso = get_aviso_by_id(aviso_id)
    fotos = get_all_fotos_by_aviso(aviso_id)
    contacto = get_contacto_by_id(aviso_id)
    
    return render_template("mascota.html", aviso=aviso, fotos=fotos, contacto=contacto)

@app.route("/estadisticas")
def estadistica():
    return render_template("estadisticas.html")

@app.route("/formulario", methods=["GET", "POST"])
def form():
    if request.method == "POST":
        region = request.form.get("region")
        comuna = request.form.get("comuna")
        sector = request.form.get("sector")
        nombre = request.form.get("nombre")
        email = request.form.get("email")
        celular = request.form.get("celular")
        tipo = request.form.get("tipo")
        cantidad = request.form.get("cantidad")
        edad = request.form.get("edad")
        uedad = request.form.get("uedad")
        fecha_str = request.form.get("fecha")
        desc = request.form.get("desc")

        contactos_data = []
        
        contacto1 = request.form.get("contacto")
        url1 = request.form.get("URL")
        if contacto1 and contacto1 != "vacio" and url1:
            contactos_data.append({'tipo': contacto1, 'valor': url1})

        for i in range(2, 6):
            contacto = request.form.get(f"contacto{i}")
            url = request.form.get(f"URL{i}")
            if contacto and contacto != "vacio" and url:
                contactos_data.append({'tipo': contacto, 'valor': url})
            elif (contacto and contacto != "vacio" and not url) or (url and not contacto):
                flash('Si agrega un contacto adicional, debe completar ambos campos (tipo y URL).', 'error')
                return redirect(url_for("form"))
        
        if len(contactos_data) == 0:
            flash('Debe agregar al menos un método de contacto válido.', 'error')
            return redirect(url_for("form"))

        todas_las_fotos = []
        
        fotos_principales = request.files.getlist("foto1")
        todas_las_fotos.extend(fotos_principales)
        
        for i in range(2, 6):
            foto_key = f"foto{i}"
            fotos_adicionales = request.files.getlist(foto_key)
            todas_las_fotos.extend(fotos_adicionales)
        
        fecha_entrega = request.form.get("fecha")
        
        nombre_archivo = []
        ruta_archivo = []
        
        for foto in todas_las_fotos:
            if foto and foto.filename:
                filename = secure_filename(foto.filename)
                filepath = os.path.join('static/uploads', filename)
                foto.save(filepath)
                
                nombre_archivo.append(filename)
                ruta_archivo.append(filepath)

        validacion = validar_input(region, comuna, sector, nombre, email, celular, 
                                  contactos_data[0]['valor'] if contactos_data else "", 
                                  tipo, cantidad, edad, uedad, fecha_str, todas_las_fotos,
                                  contactos_data)
        
        if validacion == False:
            flash('Los datos están mal ingresados. Intenta de nuevo por favor.')
            return redirect(url_for("form"))
        else:
            aviso_id = create_aviso_get_id(datetime.now(), comuna, sector, nombre, email, celular, tipo, cantidad, edad, uedad, fecha_entrega, desc)
                
            for i in range(len(nombre_archivo)):
                create_foto(ruta_archivo[i], nombre_archivo[i], aviso_id)

            for contacto in contactos_data:
                create_contactar_por(contacto['tipo'], contacto['valor'], aviso_id)

            flash('Aviso creado exitosamente')
            return redirect(url_for("index"))
            
    else:
        return render_template("form.html")