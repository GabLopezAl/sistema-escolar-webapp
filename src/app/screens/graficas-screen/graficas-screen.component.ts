import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})
export class GraficasScreenComponent implements OnInit, AfterViewInit {

  @ViewChild('lineChart', { static: false, read: BaseChartDirective }) lineChart!: BaseChartDirective;
  @ViewChild('barChart', { static: false, read: BaseChartDirective }) barChart!: BaseChartDirective;
  @ViewChild('pieChart', { static: false, read: BaseChartDirective }) pieChart!: BaseChartDirective;
  @ViewChild('doughnutChart', { static: false, read: BaseChartDirective }) doughnutChart!: BaseChartDirective;


  public total_user: any = {};

  // Histograma
  lineChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [89, 34, 43, 54, 28, 74, 93],
        label: 'Total de usuarios',
        backgroundColor: '#F88406'
      }
    ]
  };

  lineChartOption = { responsive: true };
  lineChartPlugins = [DatalabelsPlugin];

  // Barras
  barChartData = {
    labels: ["Congreso", "FePro", "Presentación Doctoral", "Feria Matemáticas", "T-System"],
    datasets: [
      {
        data: [34, 43, 54, 28, 74],
        label: 'Total de usuarios',
        backgroundColor: ['#F88406', '#FCFF44', '#82D3FB', '#FB82F5', '#2AD84A']
      }
    ]
  };

  barChartOption = { responsive: false };
  barChartPlugins = [DatalabelsPlugin];

  // Circular (Pie)
  pieChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: ['#FCFF44', '#F1C8F2', '#31E731']
      }
    ]
  };

  pieChartOption = { responsive: true, maintainAspectRatio: false };
  pieChartPlugins = [DatalabelsPlugin];

  // Dona (Doughnut)
  doughnutChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: ['#F88406', '#FCFF44', '#31E7E7']
      }
    ]
  };

  doughnutChartOption = { responsive: false, maintainAspectRatio: false };
  doughnutChartPlugins = [DatalabelsPlugin];

  constructor(
    private administradoresServices: AdministradoresService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerTotalUsers();
  }

  ngAfterViewInit(): void {
    console.log("pieChart después de view init:", this.pieChart);
    console.log("doughnutChart después de view init:", this.doughnutChart);
  }

  public obtenerTotalUsers(): void {
    this.administradoresServices.getTotalUsuarios().subscribe(
      (response) => {
        this.total_user = response;
        console.log("Total usuarios: ", this.total_user);

        const admin = this.total_user.total_administradores ?? 0;
        const maestros = this.total_user.total_maestros ?? 0;
        const alumnos = this.total_user.total_alumnos ?? 0;

        // Actualizar datos para gráfica de líneas
        this.lineChartData.labels = ["Administradores", "Maestros", "Alumnos"];
        this.lineChartData.datasets[0].data = [admin, maestros, alumnos];

        // Actualizar datos para gráfica de barras
        this.barChartData.labels = ["Administradores", "Maestros", "Alumnos"];
        this.barChartData.datasets[0].data = [admin, maestros, alumnos];


        // Actualizar datos de las gráficas
        this.pieChartData.datasets[0].data = [admin, maestros, alumnos];
        this.doughnutChartData.datasets[0].data = [admin, maestros, alumnos];

        this.cdr.detectChanges();

        setTimeout(() => {
          if (this.pieChart?.chart) this.pieChart.chart.update();
          if (this.doughnutChart?.chart) this.doughnutChart.chart.update();
          if (this.lineChart?.chart) this.lineChart.chart.update();
          if (this.barChart?.chart) this.barChart.chart.update();
        }, 0);

      },
      (error) => {
        console.error("Error al obtener usuarios:", error);
        alert("No se pudo obtener el total de cada rol de usuarios");
      }
    );
  }
}

