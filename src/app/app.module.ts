import { NgModule } from '@angular/core';
import { FacadeService } from './services/facade.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

//Angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
//Para usar el mask
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
//Cambia el idioma a español
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

import { RegistroUsuariosScreenComponent } from './screens/registro-usuarios-screen/registro-usuarios-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { RegistroAdminComponent } from './partials/registro-admin/registro-admin.component';
import { RegistroAlumnosComponent } from './partials/registro-alumnos/registro-alumnos.component';
import { RegistroMaestrosComponent } from './partials/registro-maestros/registro-maestros.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { AlumnosScreenComponent } from './screens/alumnos-screen/alumnos-screen.component';
import { MaestrosScreenComponent } from './screens/maestros-screen/maestros-screen.component';
import { EliminarUserModalComponent } from './modals/eliminar-user-modal/eliminar-user-modal.component';
import { GraficasScreenComponent } from './screens/graficas-screen/graficas-screen.component';
import { NgChartsModule } from 'ng2-charts';
import { RegistroEventosComponent } from './partials/registro-eventos/registro-eventos.component';
import { EventosScreenComponent } from './screens/eventos-screen/eventos-screen.component';
import { EditarEventoModalComponent } from './modals/editar-evento-modal/editar-evento-modal.component';
import { EliminarEventoModalComponent } from './modals/eliminar-evento-modal/eliminar-evento-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroUsuariosScreenComponent,
    HomeScreenComponent,
    NavbarComponent,
    RegistroAdminComponent,
    RegistroAlumnosComponent,
    RegistroMaestrosComponent,
    AdminScreenComponent,
    AlumnosScreenComponent,
    MaestrosScreenComponent,
    EliminarUserModalComponent,
    GraficasScreenComponent,
    RegistroEventosComponent,
    EventosScreenComponent,
    EditarEventoModalComponent,
    EliminarEventoModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    NgxMaskDirective,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    NgChartsModule,
    NgxMatTimepickerModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    provideNgxMask(),
    FacadeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
