import { Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})
export class GraficasScreenComponent implements OnInit {

  @ViewChild('pieChart', { static: false }) pieChart!: BaseChartDirective;
  @ViewChild('doughnutChart', { static: false }) doughnutChart!: BaseChartDirective;

  //Variables
  public total_user: any = {};

  //Histograma
  lineChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [89, 34, 43, 54, 28, 74, 93],
        label: 'Registro de eventos académicos',
        backgroundColor: '#F88406'
      }
    ]

  }

  lineChartOption = {
    responsive: true
  }
  lineChartPlugins = [DatalabelsPlugin];

  //Barras
  barChartData = {
    labels: ["Congreso", "FePro", "Presentación Doctoral", "Feria Matemáticas", "T-System"],
    datasets: [
      {
        data: [34, 43, 54, 28, 74],
        label: 'Registro de eventos académicos',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#82D3FB',
          '#FB82F5',
          '#2AD84A'
        ]
      }
    ]
  }
  barChartOption = {
    responsive: false
  }
  barChartPlugins = [DatalabelsPlugin]

  //Circular
  pieChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#FCFF44',
          '#F1C8F2',
          '#31E731'
        ]
      }
    ]
  }
  pieChartOption = {
    responsive: true
  }
  pieChartPlugins = [DatalabelsPlugin];

  // Doughnut
  doughnutChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#31E7E7'
        ]
      }
    ]
  }
  doughnutChartOption = {
    responsive: false
  }
  doughnutChartPlugins = [DatalabelsPlugin];

  constructor(
    private administradoresServices: AdministradoresService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerTotalUsers();
    console.log("Data: ", this.doughnutChartData);
    setTimeout(() => {
      this.pieChartData.datasets[0].data = [3, 5, 7];
      this.doughnutChartData.datasets[0].data = [2, 6, 4];
      this.pieChart.chart?.update();
      this.doughnutChart.chart?.update();
    }, 1000);

  }

  ngAfterViewInit(): void {
    console.log("pieChart después de view init:", this.pieChart);
    console.log("doughnutChart después de view init:", this.doughnutChart);
  }


  public obtenerTotalUsers() {
    this.administradoresServices.getTotalUsuarios().subscribe(
      (response) => {
        this.total_user = response;
        console.log("Total usuarios: ", this.total_user);

        // Actualiza dinámicamente las gráficas
        this.pieChartData.datasets[0].data = [
          this.total_user.total_administradores,
          this.total_user.total_maestros,
          this.total_user.total_alumnos
        ];

        this.doughnutChartData.datasets[0].data = [
          this.total_user.total_administradores,
          this.total_user.total_maestros,
          this.total_user.total_alumnos
        ];
        console.log(this.pieChartData.datasets[0].data)
        console.log(this.doughnutChartData.datasets[0].data)
        console.log("PieChart instance:", this.pieChart);
        console.log("DoughnutChart instance:", this.doughnutChart);

        // Refresca las gráficas
        this.cdr.detectChanges();
        this.pieChart?.chart?.update();
        this.doughnutChart?.chart?.update();


      }, (error) => {
        console.log(error);
        alert("No se pudo obtener el total de cada rol de usuarios");
      }

    );
  }




}
