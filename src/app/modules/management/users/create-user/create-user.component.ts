import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelUser } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    document: ['', [Validators.required]],
    email: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private serviceUser: UserService,
    private router: Router,
    private serviceSecurity: SecurityService
  ) {}

  ngOnInit(): void {
    this.IsLogin();
    this.IsAdmin();
  }

  SaveUser() {
    let nombre = this.fgValidator.controls['name'].value;
    let apellido = this.fgValidator.controls['lastName'].value;
    let documento = this.fgValidator.controls['document'].value;
    let correo = this.fgValidator.controls['email'].value;

    let newUser = new ModelUser();
    newUser.nombre = nombre;
    newUser.apellido = apellido;
    newUser.documento = String(documento);
    newUser.correo = correo;
    newUser.rol = 'encuestador';
    newUser.estado = 'activo';

    this.serviceUser.CreateUser(newUser).subscribe(
      (datos: ModelUser) => {
        alert('Usuario Creado Correctamente');
        this.router.navigate(['/administracion/lista-usuarios']);
      },
      (error: any) => {
        alert('Error Almacenando El Usuario');
      }
    );
  }

  IsLogin() {
    let data = this.serviceSecurity.GetDataSession();
    if (data === null) {
      this.router.navigate(['/inicio']);
    }
  }

  IsAdmin() {
    let data = this.serviceSecurity.GetDataSession();
    if (data.datos.rol != 'administrador') {
      this.router.navigate(['/inicio']);
    }
  }
}
