import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
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
  fgPersona: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    document: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    country: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    nivel: ['', [Validators.required]],
    edad: ['', [Validators.required]],
    profesion: ['', [Validators.required]],
    tipo_emprendimiento: ['', [Validators.required]],
    act_economica: ['', [Validators.required]],
    tipo_act_economica: ['', [Validators.required]],
    estatus_migratorio: ['', [Validators.required]],
    afiliacion_salud: ['', [Validators.required]],
    runv: ['', [Validators.required]],
    docsSeleccionados: new FormArray([]),
    discapacidad: ['', [Validators.required]],
    grupo_etnico: ['', [Validators.required]],
    movilidad_migratoria: ['', [Validators.required]],
    estudia: ['', [Validators.required]],
    grado: ['', [Validators.required]],
    parentezco: ['', [Validators.required]],

    // surveyId: ['', [Validators.required]],
  });

  // Checkbox intención
  //************************************************************************ */

  docs: Array<any> = [
    { name: 'Acta de nacimiento', value: 'Acta de nacimiento' },
    { name: 'Cédula venezolana', value: 'Cédula venezolana' },
    { name: 'PPT', value: 'PPT' },
    { name: 'Pasaporte venezolano', value: 'Pasaporte venezolano' },
    { name: 'Salvo conducto', value: 'Salvo conducto' },
    { name: 'TMF', value: 'TMF' },
    { name: 'Cédula/TI/RC Colombia', value: 'Cédula/TI/RC Colombia' },
    { name: 'Solución ETPV', value: 'Solución ETPV' },
    { name: 'Visa laboral o estudiantil', value: 'Visa laboral o estudiantil' },
    { name: 'Ninguno', value: 'Ninguno' }
  ];

  onCheckboxChange(event: any) {
    const docsSeleccionados = (this.fgPersona.controls['docsSeleccionados'] as FormArray);
    if (event.target.checked) {
      docsSeleccionados.push(new FormControl(event.target.value));

    } else {
      const index = docsSeleccionados.controls
        .findIndex(x => x.value === event.target.value);
      docsSeleccionados.removeAt(index);
    }
  }

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
        console.log(datos)
        
        this.fgPersona.controls['name'].setValue(datos.nombre);
        this.fgPersona.controls['lastName'].setValue(datos.apellido);
        this.fgPersona.controls['document'].setValue(datos.documento);
        this.fgPersona.controls['gender'].setValue(datos.documento);
        this.fgPersona.controls['country'].setValue(datos.nacionalidad);
        this.fgPersona.controls['dateOfBirth'].setValue(datos.fechaNac);
        this.fgPersona.controls['nivel'].setValue(datos.nivelEdu);
        this.fgPersona.controls['edad'].setValue(datos.edad);
        this.fgPersona.controls['profesion'].setValue(datos.profesion);
        this.fgPersona.controls['tipo_emprendimiento'].setValue(datos.tipo_emprendimiento);
        this.fgPersona.controls['act_economica'].setValue(datos.act_economica);
        this.fgPersona.controls['tipo_act_economica'].setValue(datos.tipo_act_economica);
        this.fgPersona.controls['estatus_migratorio'].setValue(datos.estatus_migratorio);
        this.fgPersona.controls['afiliacion_salud'].setValue(datos.afiliacion_salud);
        this.fgPersona.controls['docsSeleccionados'].setValue(datos.docsSeleccionados);
        this.fgPersona.controls['discapacidad'].setValue(datos.discapacidad);
        // this.fgPersona.controls['grupo_etnico'].setValue(datos.);
        this.fgPersona.controls['estudia'].setValue(datos.estudia);
        this.fgPersona.controls['grado'].setValue(datos.grado);
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
   

    let newPerson = new ModelPerson();
    newPerson.nombre = nombre;
    newPerson.apellido = apellido;
    newPerson.documento = String(documento);
    newPerson.genero = genero;
    newPerson.nacionalidad = nacionalidad;
    newPerson.fechaNac = fechaNacimiento;
    newPerson.nivelEdu = nivelEducativo;
   
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
