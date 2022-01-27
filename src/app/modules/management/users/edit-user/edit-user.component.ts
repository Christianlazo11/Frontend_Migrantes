import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  id: string = '';
  fgValidator: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    document: ['', [Validators.required]],
    email: ['', [Validators.required]],
    rol: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private serviceUser: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.SearchUser();
  }

  SearchUser() {
    this.serviceUser.GetDataById(this.id).subscribe((data: ModelUser) => {
      this.fgValidator.controls['id'].setValue(this.id);
      this.fgValidator.controls['name'].setValue(data.nombre);
      this.fgValidator.controls['lastName'].setValue(data.apellido);
      this.fgValidator.controls['document'].setValue(data.documento);
      this.fgValidator.controls['email'].setValue(data.correo);
      this.fgValidator.controls['rol'].setValue(data.rol);
      this.fgValidator.controls['password'].setValue(data.clave);
    });
  }

  EditUser() {
    let nombre = this.fgValidator.controls['name'].value;
    let apellido = this.fgValidator.controls['lastName'].value;
    let documento = this.fgValidator.controls['document'].value;
    let correo = this.fgValidator.controls['email'].value;
    let rol = this.fgValidator.controls['rol'].value;
    let clave = this.fgValidator.controls['password'].value;

    let newUser = new ModelUser();
    newUser.id = this.id;
    newUser.nombre = nombre;
    newUser.apellido = apellido;
    newUser.documento = String(documento);
    newUser.correo = correo;
    newUser.rol = rol;
    newUser.clave = clave;

    this.serviceUser.UpdateUser(newUser).subscribe(
      (datos: ModelUser) => {
        alert('Usuario Actualizado Correctamente');
        this.router.navigate(['/administracion/lista-usuarios']);
      },
      (error: any) => {
        alert('Error Actualizando El Usuario');
      }
    );
  }
}
