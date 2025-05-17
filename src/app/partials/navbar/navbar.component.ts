import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() tipo: string = "";
  @Input() rol: string = "";

  public token: string = "";
  public editar: boolean = false;
  public esVistaUsuarios: boolean = true;


  constructor(
    private router: Router,
    public facadeService: FacadeService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
    console.log("Rol user: ", this.rol);
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log('Token cargado en navbar:', this.token);
    //El primer if valida si existe un parámetro en la URL
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
    }
  }

  irARegistrarUsuario() {
    this.esVistaUsuarios = true;
    this.editar = false;
    // navegar o mostrar formulario
  }

  irARegistrarEvento() {
    this.esVistaUsuarios = false;
    this.editar = false;
    // navegar o mostrar formulario
  }


  public logout() {
    this.facadeService.logout().subscribe(
      (response) => {
        console.log("Entro a cerrar sesión");
        this.facadeService.destroyUser();
        //Navega al login
        this.router.navigate(["/"]);
      }, (error) => {
        console.error(error);
      }
    );
  }

  public goRegistro() {
    this.esVistaUsuarios = true;
    this.editar = false;
    this.router.navigate(["registro-usuarios"]);
  }

  public goRegistroEventos() {
    this.esVistaUsuarios = false;
    this.editar = false;
    this.router.navigate(["registro-eventos"]);
  }

  public clickNavLink(link: string) {
    this.router.navigate([link]);
    setTimeout(() => {
      this.activarLink(link);
    }, 100);
  }

  public activarLink(link: string) {
    if (link == "alumnos") {
      $("#principal").removeClass("active");
      $("#maestro").removeClass("active");
      $("#alumno").addClass("active");
    } else if (link == "maestros") {
      $("#principal").removeClass("active");
      $("#alumno").removeClass("active");
      $("#maestro").addClass("active");
    } else if (link == "home") {
      $("#alumno").removeClass("active");
      $("#maestro").removeClass("active");
      $("#principal").addClass("active");
    } else if (link == "graficas") {
      $("#alumno").removeClass("active");
      $("#maestro").removeClass("active");
      $("#principal").removeClass("active");
      $("#graficas").addClass("active");
    }
  }
}
