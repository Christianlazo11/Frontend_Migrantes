import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import * as cryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identify',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.css'],
})
export class IdentifyComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({
    user: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private serviceSecurity: SecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  //metodo para identificar el usuario, este se ejecutara cuando se le de click al boton Ingresar, simpre y cuando esten sus campos llenos
  identifyUser() {
    let user = this.fgValidator.controls['user'].value;
    let password = this.fgValidator.controls['password'].value;
    let encriptedKey = cryptoJS.MD5(password).toString();
    this.serviceSecurity.IdentifyUser(user, encriptedKey).subscribe(
      (data: any) => {
        this.serviceSecurity.SaveSession(data);
        alert('Datos Correctos');
        this.router.navigate(['/inicio']);
      },
      (error: any) => {
        alert('Datos No Validos');
      }
    );
  }
}
