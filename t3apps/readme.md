Para esta tarea se pedía solamente implementar los gráficos y comentarios, con un enfoque ajax en mente.

Para el caso de los gráficos, se trabajó con Highcharts y con ajax. Hay un archivo js que se llama "estadísticas", el cuál está fuertemente basado en lo que se debía hacer en el ejercicio 4, mientras que las otras funciones presentes ahí simplemente crear los gráficos de Highcharts. Si se pasa el html sacado con inspeccionar elemento en esta parte de la página, w3c tirará muchos errores. Esto se debe a que Highcharts trabaja con varias instrucciones (ej: text-align, transform-origin, etc) las cuáles no están malas, sino que son para tener más compatibilidad en varios ámbitos. Los gráficos funcionan y el html NO está mal hecho. Es una mañana que tiene el verificador solamente. Se conversó con el auxiliar y dijo que se ignoraran esos errores.

Fuera de eso, los gráficos funcionan correctamente y muestran lo pedido. Se entendió la idea de ajax y los datos se recuperan bajo esa lógica.

Luego, para el caso de los comentarios, se hizo la respectiva clase en db.py en conjunto con algunos métodos como create_comentario, get_all_comentarios_by_aviso_id, etc. Los comentarios se cargan de 2 formas diferentes que en teoría no rompen las reglas de lo pedido en la tarea.

En un inicio, se cargan los comentarios ya existentes en la base de datos (asociados a cada aviso) con flask y jinja, donde ahora, a hacer render_template, la ruta del html mascotas también recibe los comentarios. Luego, ya estando en la ruta correspondiente, con todo cargado, si se agrega un comentario, se hace de forma dinámica sin recargas, tal como se pidió. 

El funcionamiento de base (carga de datos con flask) está hecho en app.py, específicamente en los apartados con las rutas de mascota, comentarios y comentarios/agregar. El funcionamiento de carga dinámica con ajax está hecho en comentarios.js.