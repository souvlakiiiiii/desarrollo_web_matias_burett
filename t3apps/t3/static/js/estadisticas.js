async function obtenerDatosAvisos(){
  try{
    const v1 = await fetch(`/datos-graficos`);
    if(!v1.ok){
      throw new Error(`error de red: ${v1.status} - ${v1.statusText}`);
    }
    const datos = await v1.json();
    return datos.data;

  } catch(error){
    console.error("falló");
    return null;
  }
}


async function crearGrafico1() {
  try {
    const datos = await obtenerDatosAvisos();
    const datosGrafico= datos["1"];

    Highcharts.setOptions({
      time: { useUTC: false }
    });

    Highcharts.chart('g1', {
      chart: {
        type: 'line',
      },
      title: {
        text: '',
        align: 'center'
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Fecha'
        }
      },
      yAxis: {
        title: {
          text: 'Cantidad'
        }
      },
      tooltip: {
        xDateFormat: '%d/%m/%Y',
        shared: true
      },
      series: [{
        name: 'Avisos',
        data: datosGrafico,
        color: '#FF9900'
      }],
      legend: {
        enabled: true
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });

  } catch (error) {
    console.error('Error al crear el gráfico:', error);
    document.getElementById('g1').innerHTML = '<p style="color:red;">No se pudieron cargar los datos.</p>';
  }
}

async function crearGrafico2() {
  try {
    const datos = await obtenerDatosAvisos();
    const datosGrafico2 = datos["2"];

    Highcharts.chart('g2', {
      chart: {
        type: 'pie'
      },
      title: {
        text: '',
        align: 'center'
      },
      series: [{
        name: 'Cantidad',
        data: datosGrafico2,
        color: '#FF9900'
      }],
      legend: {
        enabled: true
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });

  } catch (error) {
    console.error('Error al crear el gráfico:', error);
    document.getElementById('g2').innerHTML = '<p style="color:red;">No se pudieron cargar los datos.</p>';
  }
}

async function crearGrafico3() {
    const datos = await obtenerDatosAvisos();
    const datosGrafico3 = datos["3"];
    try {
        Highcharts.chart('g3', {
            chart: { 
                type: 'column'
            },
            title: {
                text: '',
                align: 'center'
            },
            xAxis: {
                categories: datosGrafico3.categories, 
                title: { text: 'Mes' }
            },
            yAxis: {
                min: 0,
                title: { text: 'Cantidad Total' },
                stackLabels: { enabled: true, format: '{total}' }
            },
            legend: {
                enabled: true
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    dataLabels: { enabled: false }
                }
            },
            series: datosGrafico3.series 
        });

    } catch (error) {
        console.error('Error al crear el Gráfico 3:', error);
        document.getElementById('g3').innerHTML = '<p style="color:red;">No se pudieron cargar los datos del Gráfico 3.</p>';
    }
}

crearGrafico1();
crearGrafico2();
crearGrafico3();