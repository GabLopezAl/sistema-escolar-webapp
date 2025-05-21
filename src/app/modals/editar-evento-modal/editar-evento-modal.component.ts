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
  public seleccionados: any[]
  public errors: any = {};
  constructor(
    private eventoService: EventosService,
    private dialogRef: MatDialogRef<EditarEventoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.eventoService.getEventoById(this.data.id).subscribe((evento) => {
      this.evento = evento;

      this.seleccionados = this.evento.publicoObjetivo ? [...this.evento.publicoObjetivo] : [];

    });

  }

  public cerrar_modal() {
    this.dialogRef.close({ isDelete: false });
  }

  public editarEvento() {
    // console.log("Datos a enviar:", this.evento);

    //Validación
    this.errors = [];
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

    // this.errors = this.eventoService.validarEvento(this.evento,true);
    // if (!$.isEmptyObject(this.errors)) {
    //   return false;
    // }
    // console.log("Pasó la validación");

    // this.eventoService.editarEvento(this.evento).subscribe(
    //   (response) => {
    //     alert("Evento editado correctamente");
    //     console.log("Evento editado: ", response);
    //     //Si se editó, entonces mandar al home
    //     this.router.navigate(["home"]);
    //   }, (error) => {
    //     console.log(error);
    //     alert("No se pudo editar el Evento");
    //   }
    // );
  }

}
