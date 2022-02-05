import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelPerson } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
})
export class EditPersonComponent implements OnInit {
  id: string = '';

  fgValidator: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    document: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    country: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    nivel: ['', [Validators.required]],
    // surveyId: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private servicePerson: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.SearchPerson();
  }

  SearchPerson() {
    this.servicePerson
      .GetPeopleById(this.id)
      .subscribe((datos: ModelPerson) => {
        this.fgValidator.controls['id'].setValue(this.id);
        this.fgValidator.controls['name'].setValue(datos.nombre);
        this.fgValidator.controls['lastName'].setValue(datos.apellido);
        this.fgValidator.controls['document'].setValue(datos.documento);
        this.fgValidator.controls['gender'].setValue(datos.documento);
        this.fgValidator.controls['country'].setValue(datos.nacionalidad);
        this.fgValidator.controls['dateOfBirth'].setValue(datos.fechaNac);
        this.fgValidator.controls['nivel'].setValue(datos.nivelEdu);
      });
  }

  EditPerson() {
    let nombre = this.fgValidator.controls['name'].value;
    let apellido = this.fgValidator.controls['lastName'].value;
    let documento = this.fgValidator.controls['document'].value;
    let genero = this.fgValidator.controls['gender'].value;
    let nacionalidad = this.fgValidator.controls['country'].value;
    let fechaNacimiento = this.fgValidator.controls['dateOfBirth'].value;
    let nivelEducativo = this.fgValidator.controls['nivel'].value;
    let surveyId = '1521';

    let newPerson = new ModelPerson();
    newPerson.nombre = nombre;
    newPerson.apellido = apellido;
    newPerson.documento = String(documento);
    newPerson.genero = genero;
    newPerson.nacionalidad = nacionalidad;
    newPerson.fechaNac = fechaNacimiento;
    newPerson.nivelEdu = nivelEducativo;
    newPerson.encuestaId = surveyId;
    newPerson.id = this.id;

    this.servicePerson.UpdatePerson(newPerson).subscribe(
      (datos: ModelPerson) => {
        alert('Persona Actualizada Correctamente');
        this.router.navigate(['/administracion/lista-personas']);
      },
      (error: any) => {
        alert('Error Al Actualizar La Persona');
      }
    );
  }
}
