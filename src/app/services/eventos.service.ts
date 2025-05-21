import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacadeService } from './facade.service';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  // public esquemaEvento() {
  //   return {
  //     'nombre': ''
  //     // 'first_name': '',
  //     // 'last_name': '',
  //     // 'email': '',
  //     // 'password': '',
  //     // 'confirmar_password': '',
  //     // 'telefono': '',
  //     // 'rfc': '',
  //     // 'edad': '',
  //     // 'ocupacion': ''
  //   }
  // }

  //Validación para el formulario
  public validarEvento(data: any, editar: boolean) {
    console.log("Validando evento... ", data);

    let error: any = [];

    if (!this.validatorService.required(data["nombre"])) {
      error["nombre"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["tipoEvento"])) {
      error["tipoEvento"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["fecha_realizacion"])) {
      error["fecha_realizacion"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["lugar"])) {
      error["lugar"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["responsable"])) {
      error["responsable"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["publicoObjetivo"])) {
      error["publicoObjetivo"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["descripcion"])) {
      error["descripcion"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["cupoMaximo"])) {
      error["cupoMaximo"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["horaInicio"])) {
      error["horaInicio"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["horaFin"])) {
      error["horaFin"] = this.errorService.required;
    }

    //Return arreglo
    return error;
  }

  // Servicio para registrar un nuevo evento
  public registrarEvento(data: any): Observable<any> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.post<any>(`${environment.url_api}/evento/`, data, { headers: headers });
  }


  public obtenerListaEventos(rol: string): Observable<any> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    // Agrega el rol como parámetro en la URL
    return this.http.get<any>(`${environment.url_api}/lista-eventos/?rol=${rol}`, { headers: headers });
  }

  public getEventoById(idEvento: Number) {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/evento/?id=${idEvento}`, { headers });
  }


  // public editarEvento(idEvento: Number): Observable<any> {
  //   const token = this.facadeService.getSessionToken();
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer ' + token,
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.put<any>(
  //     `${environment.url_api}/evento-edit/?id=${idEvento}`,
  //     { headers }
  //   );
  // }
  public editarEvento(idEvento: number, datosEvento: any): Observable<any> {
  const token = this.facadeService.getSessionToken();
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  });

  return this.http.put<any>(
    `${environment.url_api}/evento-edit/${idEvento}/`, // ✅ URL recomendada
    datosEvento,                                       // ✅ cuerpo con los datos del formulario
    { headers }                                        // ✅ opciones
  );
}


  public eliminarEvento(idEvento: Number): Observable<any> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.delete<any>(`${environment.url_api}/eventos-edit/?id=${idEvento}`, { headers });
  }


}
