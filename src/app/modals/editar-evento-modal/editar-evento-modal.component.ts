import { Component, Inject, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-editar-evento-modal',
  templateUrl: './editar-evento-modal.component.html',
  styleUrls: ['./editar-evento-modal.component.scss']
})
export class EditarEventoModalComponent implements OnInit {
  public evento: any = {};
  public horaInicio: string = ""
  public horaFin: string = ""
  public seleccionados: string[] = [];
  public errors: any = {};
  constructor(
    private eventoService: EventosService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditarEventoModalComponent>,
    private router: Router,
  ) { this.evento = this.data.evento; }

  ngOnInit(): void {
    if (this.evento.publicoObjetivo) {
      if (typeof this.evento.publicoObjetivo === 'string') {
        this.seleccionados = this.evento.publicoObjetivo.split(',').map((p: string) => p.trim());
      } else if (Array.isArray(this.evento.publicoObjetivo)) {
        this.seleccionados = this.evento.publicoObjetivo;
      } else {
        this.seleccionados = [];
      }
    } else {
      this.seleccionados = [];
    }
  }

  public cerrar_modal() {
    this.dialogRef.close({ isDelete: false });
  }

  public editarEvento() {
    //Validación
    this.errors = [];
    this.evento.publicoObjetivo = this.seleccionados.join(', ');
    console.log("Evento a enviar:", this.evento);
    this.eventoService.editarEvento(this.evento.id, this.evento).subscribe(
      (response) => {
        console.log("Editado correctamente");
        this.dialogRef.close({ isEdit: true });
      }, (error) => {
        console.log(error);
        alert("Error al editar el evento");
        this.dialogRef.close({ isEdit: false });
      }
    );
  }

}
