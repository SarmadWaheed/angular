
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
 
} from '@angular/core';



import ApexCharts from 'apexcharts';




import {


  
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTooltip,
  ApexMarkers,
  ApexYAxis,
  ApexLegend,
  
  
} from "ng-apexcharts";








export type donutChart = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  
};


export type lineChart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
  tooltip: ApexTooltip;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  
  
  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  title = 'd3';

  chartOptions: Partial<donutChart>;
  linechartOptions:Partial<lineChart>;
  generateRandomData: any;
  
  
  
 
 
  constructor() { }

  public chart: any;
  items: any[] = [
    {
      name: 'Caroll Adams',
      email: 'caroll.adams@example.com',
      time: '04:30 PM',
      timeout:'No activity',
      notificationSent: false,
      lastnotify: '5 minutes ago'
    },
    {
      name: 'Jansh Brown',
      email: 'jansh.brown@example.com',
      time: '04:30 PM',
      timeout:'No activity',
      notificationSent: false,
      lastnotify: '5 minutes ago'
    },
    {
      name: 'Donald Risher',
      email: 'donald.risher@example.com',
      time: '04:30 PM',
      timeout:'No activity',
      notificationSent: false,
      lastnotify: '5 minutes ago'
    },
    {
      name: 'Bella Pinto',
      email: 'bella.pinto@example.com',
      time: '04:30 PM',
      timeout:'No activity',
      notificationSent: false,
      lastnotify: '5 minutes ago'
    },
    {
      name: 'Karry Fournier',
      email: 'Karry.fournier@example.com',
      time: '04:30 PM',
      timeout:'No activity',
      notificationSent: false,
      lastnotify: '5 minutes ago'
    }
  ];


  ngOnInit(): void {
    
    this.createChart();
    
    this.createlineChart();
    
  }

  
  createChart() {

    this.chartOptions = {
      series: [8, 4, 6],
      chart: {
        type: "donut",
        width: 300, // Adjust the width of the chart
       

       
      },
      
      labels: [
        "Active sales person outside dealership "  ,
        "Inactive sales person within dealership " ,
        "Active sales person within dealership" 
      ],
    
     
      
      responsive: [
        {
          breakpoint: 1380,
          options: {
            
              colors: ['#18A558', '#1E2F97', '#F1A104'],
            
            dataLabels: {
        
              enabled: false,
              
           
              },
            legend: {
              show: true,
              position: 'bottom',
              fontSize: "12px",
             
        
              customLegendItems: [ ' Sales person using SWAI within dealership',
              ' Sales person not using SWAI within dealership',
              ' Sales person using SWAI outside dealership'],
              

          
              formatter: function(seriesName: string, opts: { w: { globals: { seriesTotals: any[]; series: { [x: string]: any; }; }; }; seriesIndex: string | number; }) {
                var total = opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                var percentage = ((opts.w.globals.series[opts.seriesIndex] / total) * 100).toFixed(1) + "%";
                var dataValue = opts.w.globals.series[opts.seriesIndex];
            
                return [
                  "<div class='row'><div class='col-8'><span style='color: grey;  font-size: 10px;'>" + seriesName + "</span></div><div class='col-2'><span style='color: grey; '>" + percentage + "</span></div><div class='col-2'><span style='color: green;'>  0" + dataValue + "</span></div></div>",
                  "",
                  ""
                ];
            
              
            }
            
            
            },
            chart: {
              width: 300,
              height:328
            },
            plotOptions: {
              pie: {
                customScale: 1.1,
                expandOnClick: false,
                donut: {
                  size: '68%',
                  labels: {
                    show: true,
                    value: {
                      show: true,
                      fontSize: '16px',
                      fontFamily: 'Arial',
                      fontWeight: 400,
                      color: "black",
                      offsetY: 10,
                      formatter: function (val: any) {
                        return val
                      }
                    },
                    total: {
                      show: true,
                      showAlways: true,
                      label: ['Total','Sales Person'],
                      fontSize: '8px',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontWeight: 400,
                      color: 'grey',
                      formatter: function (w: { globals: { seriesTotals: any[]; }; }) {
                        return w.globals.seriesTotals.reduce((a: any, b: any) => {
                          return a + b
                        }, 0)
                      }
                    }
                  },
                
                }
              }

              
            }

           
          }
        }
      
    
      ]

      
    };

   
   
};

createlineChart() {

 
  
  var trigoStrength = 3;
  var iteration = 11;

  function getRandom() {
    var i = iteration;
    return (
      (Math.sin(i / trigoStrength) * (i / trigoStrength) +
        i / trigoStrength +
        1) *
      (trigoStrength * 2)
    );
  }

  

  function generateMinuteWiseTimeSeries(baseval: number, count: number, yrange: { min: number; max: number; }) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y = ((Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2))
  
      series.push([x, y]);
      baseval += 300000;
      i++;
    }
    return series;
  }

  

this.linechartOptions = {

  

  
  chart: {
    height: 350,
    type: 'line',
    stacked: true,
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22
    },
    events: {
      animationEnd: function (chartCtx, opts) {
        const newData1 = chartCtx.w.config.series[0].data.slice()
        newData1.shift()
        const newData2 = chartCtx.w.config.series[1].data.slice()
        newData2.shift()

        // check animation end event for just 1 series to avoid multiple updates
        if (opts.el.node.getAttribute('index') === '0') {
          window.setTimeout(function () {
            chartCtx.updateOptions({
              series: [{
                data: newData1
              }, {
                data: newData2
              }],

              
             
            
            
            }, false, false)
          }, 300)
        }

      }
    },

    
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 5,
  },
  grid: {
    padding: {
      left: 0,
      right: 0
    }
  },
  markers: {
    size: 5,
    hover: {
      size: 5
    }
  },
  series: [{
    name: 'Active Sales Person',
    data: generateMinuteWiseTimeSeries(new Date().getTime(), 12, {
      min: 30,
      max: 110
    })
  }, {
    name: 'Inactive Sales Person',
    data: generateMinuteWiseTimeSeries(new Date().getTime(), 12, {
      min: 30,
      max: 110
    })
  }],
  xaxis: {
    type: 'datetime',
    range: 3600000
  },
  yaxis: {
    decimalsInFloat: 0,
    opposite: true,
    labels: {
      offsetX: -10
    }
  },

  tooltip: {
    theme: 'light',
   
  },
  
  
  legend: {

    show: true,
    floating: true,
    horizontalAlign: 'left',
    onItemClick: {
      toggleDataSeries:false
    },
    position: 'top',
    offsetY: -28,
    offsetX: 60
  },

  
}



  
var chartLine = new ApexCharts(
  document.querySelector("#chart"),
  this.linechartOptions
);

// Render the chart
chartLine.render().then(() => {
  // Define the interval function inside the render callback
  window.setInterval((chartLine: {
    updateSeries: (arg0: { name: string; data: any[]; }[]) => void;
    w: {
      config: {
        series: { data: any }[];
      };
      globals: { maxX: number };
    };
  }) => {
    iteration++;
    chartLine.updateSeries([
      {
        name: "Active Sales Person",
        data: [
          ...chartLine.w.config.series[0].data,
          [chartLine.w.globals.maxX + 1000, getRandom()]
        ]
      },
      {
        name: "Inactive Sales Person",
        data: [
          ...chartLine.w.config.series[1].data,
          [chartLine.w.globals.maxX + 1000, getRandom()]
        ]
      }
    ]);

    console.log('data', chartLine.w.config.series[1].data);
  }, 3000, chartLine); // Pass chartLine as the third argument to setInterval
});

}}






