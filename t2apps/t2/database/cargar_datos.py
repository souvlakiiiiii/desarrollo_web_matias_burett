import os
from db import engine

def cargar_datos():
    # Encontrar la ruta absoluta sin importar dónde esté el script
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    sql_path = os.path.join(base_dir, 'database', 'region-comuna.sql')
    
    print(f"Buscando en: {sql_path}")
    print(f"¿Existe?: {os.path.exists(sql_path)}")
    
    if not os.path.exists(sql_path):
        print(" Archivo no encontrado. Directorios disponibles:")
        for root, dirs, files in os.walk(base_dir):
            print(f"  {root}: {files}")
        return
    
    with open(sql_path, 'r', encoding='utf-8') as f:
        sql = f.read()
    
    with engine.connect() as conn:
        conn.execute(sql)
        conn.commit()
    
    print(" Datos cargados exitosamente")

if __name__ == "__main__":
    cargar_datos()