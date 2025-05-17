import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
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
  public idUser: Number = 0;
  public tipo: string = "registro-usuarios";

  constructor(
    private location: Location,
    private eventosService: EventosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {

  }

  public registrar() {
    //Validación del formulario
    this.errors = [];

    this.errors = this.eventosService.validarEvento(this.evento, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    // if (this.admin.password == this.admin.confirmar_password) {
    //   //Aquí va toda la lógica para registrar a un usuario
    //   this.administradoresService.registrarAdmin(this.admin).subscribe(
    //     (response) => {
    //       // Aqui va la ejecución del servicio sí todo es correcto
    //       alert("Usuario registrado correctamente");
    //       console.log("Usuario registrado: ", response);
    //       if (this.token != "") {
    //         this.router.navigate(["home"]);
    //       } else {
    //         this.router.navigate(["/"]);
    //       }
    //     }, (error) => {
    //       // Aquí se ejecuta el error
    //       alert("No se pudo registrar usuario");
    //     }
    //   );

    // } else {
    //   alert("Las contraseñas no coinciden");
    // }
    // TODO:Aquí va la demás funcionalidad para registrar
  }

  public regresar() {
    this.location.back();
  }

  public actualizar(){

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


}
