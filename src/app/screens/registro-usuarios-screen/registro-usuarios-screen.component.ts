import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { FacadeService } from 'src/app/services/facade.service';
import { MaestrosService } from 'src/app/services/maestros.service';

@Component({
  selector: 'app-registro-usuarios-screen',
  templateUrl: './registro-usuarios-screen.component.html',
  styleUrls: ['./registro-usuarios-screen.component.scss']
})
export class RegistroUsuariosScreenComponent implements OnInit {

  public tipo: string = "registro-usuarios";
  public user: any = {};
  public editar: boolean = false;
  public rol: string = "";
  public idUser: number = 0;
  //Banderas para el tipo de usuario
  public isAdmin: boolean = false;
  public isAlumno: boolean = false;
  public isMaestro: boolean = false;

  public tipo_user: string = "";

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private facadeService: FacadeService,
    private administradoresService: AdministradoresService,
    private alumnosService: AlumnosService,
    private maestrosService: MaestrosService
  ) { }

  ngOnInit(): void {
    // Obtener de la url el rol para saber cual editar
    if (this.activatedRoute.snapshot.params['rol'] != undefined) {
      this.rol = this.activatedRoute.snapshot.params['rol'];
      console.log("Rol detected: ", this.rol);
    }

    // El if valida si existe un parámetro en la url
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      // Asignamos a nuestra variable global el valor del ID que viene de la url
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID user: ", this.idUser);
      // Al iniciar la vista obtiene al usuaio por su id
      this.obtenerUserByID();
    }
  }

  //Función para obtener un solo usuario por su ID
  public obtenerUserByID() {
    if (this.rol == "administrador") {
      this.administradoresService.getAdminByID(this.idUser).subscribe(
        (response) => {
          this.user = response;
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol;
          this.isAdmin = true;
          //this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
          console.log("Datos admin: ", this.user);
        }, (error) => {
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
    } else if (this.rol == "maestro") {
      this.maestrosService.getMaestroByID(this.idUser).subscribe(
        (response) => {
          this.user = response;
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol;
          this.isMaestro = true;
          this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
          console.log("Datos maestro: ", this.user);
        }, (error) => {
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
    } else if (this.rol == "alumno") {
      this.alumnosService.getAlumnoByID(this.idUser).subscribe(
        (response) => {
          this.user = response;
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol;
          this.isAlumno = true;
          this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
          console.log("Datos alumno: ", this.user);
        }, (error) => {
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
    }
  }

  public radioChange(event: MatRadioChange) {
    if (event.value == "administrador") {
      this.isAdmin = true;
      this.tipo_user = "administrador"
      this.isAlumno = false;
      this.isMaestro = false;
    } else if (event.value == "alumno") {
      this.isAdmin = false;
      this.isAlumno = true;
      this.tipo_user = "alumno"
      this.isMaestro = false;
    } else if (event.value == "maestro") {
      this.isAdmin = false;
      this.isAlumno = false;
      this.isMaestro = true;
      this.tipo_user = "maestro"
    }
  }
}
