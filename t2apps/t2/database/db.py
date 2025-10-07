from sqlalchemy import create_engine, Column, Integer, BigInteger, String, ForeignKey, Enum, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, joinedload

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

class AvisoAdopcion(Base):
    __tablename__ = 'aviso_adopcion'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    fecha_ingreso=Column(DateTime,nullable=False)
    comuna_id=Column(Integer, ForeignKey('comuna.id'), nullable=False)
    sector=Column(String(100), nullable=True)
    nombre=Column(String(200), nullable=False)
    email=Column(String(100), nullable=False)
    celular=Column(String(15), nullable=True)
    tipo = Column(Enum('gato', 'perro'), nullable=False)
    cantidad=Column(Integer, nullable=False)
    edad=Column(Integer, nullable=False)
    unidad_medida=Column(Enum('a','m'), nullable=False)
    fecha_entrega=Column(DateTime, nullable=False)
    descripcion=Column(String(500), nullable=True)

    #relationships

    comuna = relationship("Comuna", back_populates="avisos")
    fotos = relationship("Foto", back_populates="aviso")
    contactos = relationship("ContactarPor", back_populates="aviso")

class Region(Base):
    __tablename__ = 'region'

    id=Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    nombre=Column(String(200), nullable=False)

    #relationships

    comuna2=relationship("Comuna", back_populates="region")

class Comuna(Base):
    __tablename__ = 'comuna'

    id=Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    nombre=Column(String(200), nullable=False)
    region_id=Column(Integer, ForeignKey('region.id'), nullable=False)

    #relationships

    region=relationship("Region", back_populates="comuna2")
    avisos=relationship("AvisoAdopcion", back_populates="comuna")


class Foto(Base):
    __tablename__ = 'foto'

    id=Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    ruta_archivo=Column(String(300), nullable=False)
    nombre_archivo=Column(String(300), nullable=False)
    aviso_id=Column(Integer, ForeignKey('aviso_adopcion.id'), nullable=False, primary_key=True)

    #relationships

    aviso=relationship("AvisoAdopcion", back_populates="fotos")

class ContactarPor(Base):
    __tablename__ = 'contactar_por'

    id=Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    nombre=Column(Enum('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra'), nullable=False)
    identificador=Column(String(150), nullable=False)
    aviso_id=Column(Integer, ForeignKey('aviso_adopcion.id'), primary_key=True, nullable=False)

    #relationships

    aviso=relationship("AvisoAdopcion", back_populates="contactos")

def get_aviso_by_id(id):
    session = SessionLocal()
    aviso = session.query(AvisoAdopcion).options(joinedload(AvisoAdopcion.comuna), joinedload(AvisoAdopcion.fotos), joinedload(AvisoAdopcion.contactos)).filter_by(id=id).first()
    session.close()
    return aviso

def get_aviso_by_email(email):
    session = SessionLocal()
    user = session.query(AvisoAdopcion).filter_by(email=email).first()
    session.close()
    return user

def get_aviso_by_region(nombre):
    session = SessionLocal()
    user = session.query(Region).filter_by(nombre=nombre).first()
    session.close()
    return user

def create_aviso(fecha_ingreso, comuna_id, sector, nombre, email, celular, tipo, cantidad, edad, unidad_medida, fecha_entrega, descripcion):
    session = SessionLocal()
    new_aviso = AvisoAdopcion(fecha_ingreso=fecha_ingreso, comuna_id=comuna_id, sector=sector, nombre=nombre, email=email, celular=celular, tipo=tipo, cantidad=cantidad, edad=edad, unidad_medida=unidad_medida, fecha_entrega=fecha_entrega, descripcion=descripcion)
    session.add(new_aviso)
    session.commit()
    session.close()

def create_aviso_get_id(fecha_ingreso, comuna_id, sector, nombre, email, celular, tipo, cantidad, edad, unidad_medida, fecha_entrega, descripcion):
    session = SessionLocal()
    new_aviso = AvisoAdopcion(fecha_ingreso=fecha_ingreso, comuna_id=comuna_id, sector=sector, nombre=nombre, email=email, celular=celular, tipo=tipo, cantidad=cantidad, edad=edad, unidad_medida=unidad_medida, fecha_entrega=fecha_entrega, descripcion=descripcion)
    session.add(new_aviso)
    session.commit()
    aviso_id = new_aviso.id
    session.close()
    return aviso_id

def create_foto(ruta_archivo, nombre_archivo, aviso_id):
    session=SessionLocal()
    new_foto=Foto(ruta_archivo=ruta_archivo, nombre_archivo=nombre_archivo, aviso_id=aviso_id)
    session.add(new_foto)
    session.commit()
    session.close()

def create_contactar_por(nombre, identificador, aviso_id):
    session=SessionLocal()
    new_contacto=ContactarPor(nombre=nombre, identificador=identificador, aviso_id=aviso_id)
    session.add(new_contacto)
    session.commit()
    session.close()

def get_aviso(aviso):
    session = SessionLocal()
    avisoDevolver = session.query(AvisoAdopcion).filter_by(id=aviso).first()
    session.close()
    return avisoDevolver

def contar_avisos():
    session=SessionLocal()
    numero=session.query(AvisoAdopcion).count()
    print(f"DEBUG: contar_avisos() retorna: {numero}")
    session.close()
    return numero

def get_contacto_by_aviso(id):
    session=SessionLocal()
    contactoD=session.query(ContactarPor).filter_by(aviso_id=id).first()
    session.close()
    return contactoD

def get_all_aviso():
    session=SessionLocal()
    avisosDevolver=session.query(AvisoAdopcion).all()
    session.close()
    return avisosDevolver

def get_5_avisos():
    session = SessionLocal()
    avisos = session.query(AvisoAdopcion).options(
        joinedload(AvisoAdopcion.comuna)  # Cargar la relación comuna
    ).order_by(AvisoAdopcion.fecha_ingreso.desc()).limit(5).all()
    session.close()
    return avisos

def get_avisos_paginados(pagina=1, avisos_por_pagina=5):
    session = SessionLocal()
    offset = (pagina - 1) * avisos_por_pagina
    avisos = session.query(AvisoAdopcion).options(
        joinedload(AvisoAdopcion.comuna),
        joinedload(AvisoAdopcion.fotos)
    ).order_by(AvisoAdopcion.id.desc()).offset(offset).limit(avisos_por_pagina).all()
    session.close()
    return avisos

def get_foto_by_aviso(id):
    session = SessionLocal()
    fotoDevolver=session.query(Foto).filter_by(aviso_id=id).first()
    session.close()
    return fotoDevolver

def get_all_fotos_by_aviso_numero(id):
    session = SessionLocal()
    fotoDevolver=session.query(Foto).filter_by(aviso_id=id).count()
    session.close()
    return fotoDevolver

def get_all_fotos_by_aviso(id):
    session = SessionLocal()
    fotoDevolver=session.query(Foto).filter_by(aviso_id=id).all()
    session.close()
    return fotoDevolver

def get_comuna_by_id(id):
    session=SessionLocal()
    aviso=session.query(AvisoAdopcion).filter_by(id=id).first()
    comuna=aviso.comuna
    session.close()
    return comuna

def get_contacto_by_id(id):
    session=SessionLocal()
    contactoDevolver=session.query(ContactarPor).filter_by(aviso_id=id)
    session.close()
    return contactoDevolver

def get_aviso_id(aviso):
    session=SessionLocal()
    id=session.query(AvisoAdopcion).filter_by(id)
    session.close()
    return AvisoAdopcion

def get_nombre_by_id(id):
    session = SessionLocal()
    aviso = session.query(AvisoAdopcion).filter_by(id=id).first()
    nombre=aviso.nombre
    session.close()
    return nombre

def get_region_by_id(id):
    session = SessionLocal()
    aviso = session.query(AvisoAdopcion).filter_by(id=id).first()
    region=aviso.region
    session.close()
    return region

def get_sector_by_id(id):
    session = SessionLocal()
    aviso = session.query(AvisoAdopcion).filter_by(id=id).first()
    sector = aviso.sector
    session.close()
    return sector

def get_fechapub_by_id(id):
    session = SessionLocal()
    aviso = session.query(AvisoAdopcion).filter_by(id=id).first()
    fecha = aviso.fecha_ingreso
    session.close()
    return fecha

def get_fechaent_by_id(id):
    session = SessionLocal()
    aviso = session.query(AvisoAdopcion).filter_by(id=id).first()
    fecha = aviso.fecha_entrega
    session.close()
    return fecha

def get_cantidad_by_id(id):
    session = SessionLocal()
    aviso = session.query(AvisoAdopcion).filter_by(id=id).first()
    cantidad = aviso.cantidad
    session.close()
    return cantidad

def get_tipo_by_id(id):
    session = SessionLocal()
    aviso = session.query(AvisoAdopcion).filter_by(id=id).first()
    tipo = aviso.tipo
    session.close()
    return tipo

def get_edad_by_id(id):
    session = SessionLocal()
    aviso = session.query(AvisoAdopcion).filter_by(id=id).first()
    edad = aviso.edad
    session.close()
    return edad

def get_uedad_by_id(id):
    session = SessionLocal()
    aviso = session.query(AvisoAdopcion).filter_by(id=id).first()
    uedad = aviso.unidad_medida
    session.close()
    return uedad

def get_all_regiones():
    session=SessionLocal()
    regiones=session.query(Region).all()
    session.close()
    return regiones

def get_region_id(nombre):
    session=SessionLocal()
    coso=session.query(Region).filter_by(nombre=nombre)
    id=coso.id
    return id

def get_comuna_by_region(region_id):
    session=SessionLocal()
    comunas=session.query(Comuna).filter_by(region_id=region_id)
    session.close()
    return comunas

def get_all_comunas():
    session=SessionLocal()
    comunas=session.query(Comuna).all()
    session.close()
    return comunas