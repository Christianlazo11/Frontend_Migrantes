import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelUser } from 'src/app/models/user.model';
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
    rol: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private serviceUser: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  SaveUser() {
    let nombre = this.fgValidator.controls['name'].value;
    let apellido = this.fgValidator.controls['lastName'].value;
    let documento = this.fgValidator.controls['document'].value;
    let correo = this.fgValidator.controls['email'].value;
    let rol = this.fgValidator.controls['rol'].value;

    let newUser = new ModelUser();
    newUser.nombre = nombre;
    newUser.apellido = apellido;
    newUser.documento = String(documento);
    newUser.correo = correo;
    newUser.rol = rol;

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
}
