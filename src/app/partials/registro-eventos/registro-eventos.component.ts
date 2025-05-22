import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
import { MaestrosService } from 'src/app/services/maestros.service';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { EditarEventoModalComponent } from 'src/app/modals/editar-evento-modal/editar-evento-modal.component';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;

@Component({
  selector: 'app-registro-eventos',
  templateUrl: './registro-eventos.component.html',
  styleUrls: ['./registro-eventos.component.scss']
})
export class RegistroEventosComponent implements OnInit {

  public evento: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public token: string = "";
  public tipo: string = "registro-usuarios";
  public minDate: Date = new Date();
  public horaInicio: string = '';
  public horaFin: string = '';
  public errorHora: string = '';
  public lugar: string = '';
  public tiposEvento: string[] = ['Conferencia', 'Taller', 'Seminario', 'Concurso'];
  public responsables: any[] = [];
  public apiService: any;
  public publicObj = [
    { nombre: 'Estudiantes' },
    { nombre: 'Profesores' },
    { nombre: 'Público general' }
  ];
  public seleccionados: string[] = [];
  public programaEducativo: string = '';
  public responsableSeleccionado: string = '';
  public descripcion: string = '';
  public cupoMaximo: string = '';
  public nombre: string = '';
  public tipoEvento: string = '';
  public fecha_realizacion: string = '';
  public opsc: string = '';
  public responsable: string = '';

  constructor(
    private location: Location,
    private eventosService: EventosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    private maestrosService: MaestrosService,
    private adminService: AdministradoresService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.errors = {
      nombre: '',
      tipoEvento: '',
      fecha_realizacion: '',
      horaInicio: '',
      horaFin: '',
      lugar: '',
      publicoObjetivo: '',
      programaEducativo: '',
      responsable: '',
      descripcion: '',
      cupoMaximo: ''
    };
    // this.obtenerResponsables();

    const idEvento = this.activatedRoute.snapshot.params['id'];

    this.obtenerResponsables().then(() => {
      if (idEvento) {
        this.editar = true;
        this.eventosService.getEventoById(idEvento).subscribe((evento) => {
          this.evento = evento;

          // Prellenar valores
          this.nombre = evento.nombre;
          this.tipoEvento = evento.tipoEvento;
          this.fecha_realizacion = evento.fecha_realizacion;
          this.horaInicio = this.convertirA24Horas(evento.horaInicio);
          this.horaFin = this.convertirA24Horas(evento.horaFin);
          this.lugar = evento.lugar;
          this.descripcion = evento.descripcion;
          this.cupoMaximo = evento.cupoMaximo;
          this.programaEducativo = evento.programaEducativo;

          this.evento.responsable = +evento.responsable;

          this.seleccionados = evento.publicoObjetivo
            ? evento.publicoObjetivo.split(',').map(p => p.trim())
            : [];

          console.log("Evento cargado para editar:", this.evento);
        });
      }
    });
  }


  public registrar() {
    this.evento.horaInicio = this.convertirA24Horas(this.horaInicio);
    this.evento.horaFin = this.convertirA24Horas(this.horaFin);
    this.evento.publicoObjetivo = this.seleccionados.join(', ');

    //Validación del formulario
    this.errors = [];
    this.validarHoras();

    if (this.errors.horaInicio || this.errors.horaFin) {
      this.errorHora = 'Las horas no son válidas.';
      return false;
    } else {
      this.errorHora = '';
    }

    this.errors = this.eventosService.validarEvento(this.evento, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    // Si no hay errores, mandar POST al backend para crear evento
    this.eventosService.registrarEvento(this.evento).subscribe(
      (response) => {
        alert("Evento registrado correctamente");
        console.log("Evento registrado:", response);

        // Redireccionar si quieres, por ejemplo a home o lista de eventos
        this.router.navigate(["home"]);
      },
      (error) => {
        alert("No se pudo registrar el evento");
        console.error(error);
      }
    );
  }

  obtenerResponsables(): Promise<void> {
    return new Promise((resolve) => {
      this.maestrosService.obtenerListaMaestros().subscribe(maestros => {
        this.adminService.obtenerListaAdmins().subscribe(admins => {
          this.responsables = [...maestros, ...admins];
          console.log("Maestros y Admins: ", this.responsables);
          resolve();
        });
      });
    });
  }


  isSelected(nombre: string): boolean {
    return this.seleccionados.includes(nombre);
  }

  checkboxChange(event: any, nombre: string) {
    if (event.checked) {
      this.seleccionados.push(nombre);
    } else {
      const index = this.seleccionados.indexOf(nombre);
      if (index >= 0) {
        this.seleccionados.splice(index, 1);
      }
    }

    // Actualiza el objeto evento
    this.evento.publicoObjetivo = [...this.seleccionados]; // crea una copia para Angular
  }


  filtrarLugar() {
    // Reemplaza todo lo que no sea letra, número o espacio
    this.lugar = this.lugar.replace(/[^a-zA-Z0-9 ]/g, '');
  }

  validarHoras() {
    delete this.errors.horaInicio;
    delete this.errors.horaFin;

    if (this.horaInicio && this.horaFin) {
      const inicio = this.convertirAHoras(this.horaInicio);
      const fin = this.convertirAHoras(this.horaFin);

      if (inicio >= fin) {
        this.errors.horaInicio = 'La hora de inicio debe ser menor que la de finalización';
        this.errors.horaFin = 'La hora de finalización debe ser mayor que la de inicio';
      }
    }
  }

  private convertirAHoras(hora: string): number {
    const [time, meridian] = hora.split(' ');
    const [h, m] = time.split(':').map(Number);

    let horas = h;
    if (meridian === 'PM' && h !== 12) {
      horas += 12;
    }
    if (meridian === 'AM' && h === 12) {
      horas = 0;
    }

    return horas * 60 + m;
  }

  convertirA24Horas(time12h: string): string {
    if (!time12h) return '';
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':').map(x => parseInt(x, 10));

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  public regresar() {
    this.location.back();
  }

  public editarModal() {
    const dialogRef = this.dialog.open(EditarEventoModalComponent, {
      data: { evento: this.evento },
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.isEdit) {
        alert("Evento editado correctamente");
        // Recargar datos o redireccionar
        this.router.navigate(["home"]);
      } else {
        console.log("No se editó el evento");
      }
    });
  }

  public validarNombreEvento(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);

    // Letras mayúsculas (A-Z), minúsculas (a-z), números (0-9) y espacio (32)
    const esLetra = (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
    const esNumero = (charCode >= 48 && charCode <= 57);
    const esEspacio = charCode === 32;

    if (!esLetra && !esNumero && !esEspacio) {
      event.preventDefault();
    }
  }

  //Función para detectar el cambio de fecha
  public changeFecha(event: any) {
    console.log(event);
    console.log(event.value.toISOString());

    this.evento.fecha_realizacion = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.evento.fecha_realizacion);
  }

  validarDescripcion() {
    const regex = /^[a-zA-Z0-9.,;:¡!¿?\-\s\r\n]*$/; // Letras, números, espacios, signos básicos, salto de línea
    if (this.descripcion.length > 300) {
      this.errors.descripcion = 'La descripción no puede tener más de 300 caracteres.';
    } else if (!regex.test(this.descripcion)) {
      this.errors.descripcion = 'Solo se permiten letras, números y signos de puntuación básicos.';
    } else {
      delete this.errors.descripcion;
    }
  }

  validarCupo(event: KeyboardEvent): void {
    const input = event.key;
    const isNumber = /^[0-9]$/.test(input);
    const valorActual = this.cupoMaximo?.toString() || '';

    // Permitir solo números y hasta 3 dígitos
    if (!isNumber || valorActual.length >= 3) {
      event.preventDefault();
    }
  }

}
