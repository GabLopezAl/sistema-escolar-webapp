import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
import { FacadeService } from 'src/app/services/facade.service';


@Component({
  selector: 'app-eventos-screen',
  templateUrl: './eventos-screen.component.html',
  styleUrls: ['./eventos-screen.component.scss']
})
export class EventosScreenComponent implements OnInit {

  public name_user: string = "";
  public rol: string = "";
  public token: string = "";
  public lista_eventos: any[] = [];

  //Para la tabla // Columnas a mostrar
  //displayedColumns: string[] = ['nombre', 'tipoEvento', 'fecha_realizacion', 'horaInicio', 'horaFin', 'lugar', 'programaEducativo', 'cupoMaximo', 'publicoObjetivo', 'editar', 'eliminar'];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<DatosEvento>(this.lista_eventos as DatosEvento[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private eventosService: EventosService,
    private facadeService: FacadeService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();

    this.displayedColumns = [
      'nombre',
      'tipoEvento',
      'fecha_realizacion',
      'horaInicio',
      'horaFin',
      'lugar',
      'programaEducativo',
      'cupoMaximo',
      'publicoObjetivo',
    ];

    if (this.rol === 'administrador') {
      this.displayedColumns.push('editar');
      this.displayedColumns.push('eliminar');
    }

    //Obtener eventos
    this.obtenerEventos();
    //Para paginador
    this.initPaginator();

  }

  //Para paginación
  public initPaginator() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    }, 500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  public obtenerEventos() {
    const rolLower = this.rol;

    this.eventosService.obtenerListaEventos(rolLower).subscribe(
      (response) => {
        this.lista_eventos = response;
        console.log("Lista eventos: ", this.lista_eventos);
        if (this.lista_eventos.length > 0) {
          console.log("Eventos: ", this.lista_eventos);
          this.dataSource = new MatTableDataSource<DatosEvento>(this.lista_eventos as DatosEvento[]);
        }
      },
      (error) => {
        alert("No se pudo obtener la lista de eventos");
      }
    );
  }

  public goEditar(idEvento: number) {
    this.router.navigate(["registro-eventos/eventos/" + idEvento]);
  }

  public delete(idUser: number) {

  }
}



export interface DatosEvento {
  id: number,
  nombre: string;
  tipoEvento: string;
  fecha_realizacion: string;
  horaInicio: string;
  horaFin: string;
  lugar: string;
  publicoObjetivo: string;
  programaEducativo: string;
  resposable: string;
  descripcion: string;
  cupoMaximo: number;
}
