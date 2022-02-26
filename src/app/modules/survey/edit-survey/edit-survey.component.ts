import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelDatos } from 'src/app/models/datos.model';
import { ModelPerson } from 'src/app/models/person.model';
import { ModelSurvey } from 'src/app/models/survey.model';
import { ModelUser } from 'src/app/models/user.model';
import { PersonService } from 'src/app/services/person.service';
import { SecurityService } from 'src/app/services/security.service';
import { SurveyService } from 'src/app/services/survey.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { __values } from 'tslib';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {
  item: any
  noEncu: any

  preguntas: any
  data: any
  validador = false
  NoEncu: any

  listSurvey: ModelSurvey[] = [];
  listUsers: ModelUser[] = [];
  listPeople: ModelPerson[] = [];


  constructor(
    private fb: FormBuilder,
    private serviceSurvey: SurveyService,
    private servicePerson: PersonService,
    private serviceSecurity: SecurityService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.noEncu = this.route.snapshot.params['id'];
    this.SerchSurvey();


  }

  //Creamos el formulario
  fgValidator: FormGroup = this.fb.group({
    municipio: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.required]],
    intencion: ['', [Validators.required]],
    est_civil: ['', [Validators.required]],
    info_nucleo: ['', [Validators.required]],
    conf_hogar: ['', [Validators.required]],
    quedaron_hijos: ['', [Validators.required]],
    nacionalidad_pareja: ['', [Validators.required]],
    razon_cruce: ['', [Validators.required]],
    tiempo_estancia: ['', [Validators.required]],
    razon_arauca: ['', [Validators.required]],

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
    docsSeleccionados: new FormArray([]),
    discapacidad: ['', [Validators.required]],
    grupo_etnico: ['', [Validators.required]],
    estudia: ['', [Validators.required]],
    grado: ['', [Validators.required]],




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



  SerchSurvey(){

    console.log("l número de encuesta es: " + this.noEncu.replace(":",""))
    
    this.serviceSurvey.GetData(this.noEncu.replace(":","")).subscribe(
      (datos: ModelSurvey) => {
        console.log(Object.values(datos)[0].fijo_cel)
       
        this.fgValidator.controls['municipio'].setValue(Object.values(datos)[0].municipio);
        this.fgValidator.controls['direccion'].setValue(Object.values(datos)[0].direccion);
        this.fgValidator.controls['correo'].setValue(Object.values(datos)[0].correo);
        this.fgValidator.controls['tel'].setValue(Object.values(datos)[0].fijo_cel);
        this.fgValidator.controls['intencion'].setValue(Object.values(datos)[0].intencion);
        // this.fgValidator.controls['docsSeleccionados'].setValue(Object.values(datos)[0].docsSeleccionados);
        this.fgValidator.controls['etnia'].setValue(Object.values(datos)[0].etnia);
        this.fgValidator.controls['identGenero'].setValue(Object.values(datos)[0].ident_genero);
        this.fgValidator.controls['orSexual'].setValue(Object.values(datos)[0].intencion);

      },
      (error) => {
        alert("No se encontró la encuesta")
        this.router.navigate([`/encuesta/buscar-encuesta`]);

      })

  }

  ModificarEncuesta() {

    //Buscar el número de la encuensta
    let dataEncu = this.serviceSecurity.GetDataSession();  
    let Municipio = this.fgValidator.controls['municipio'].value;
    let Direccion = this.fgValidator.controls['direccion'].value;
    let Correo = this.fgValidator.controls['correo'].value;
    let Telefono = this.fgValidator.controls['tel'].value;
    let Estado_civil= this.fgValidator.controls['est_civil'].value;

    let Intencion = this.fgValidator.controls['intencion'].value;
    let DocsCuenta: string[] = this.fgValidator.value.docsSeleccionados;
    let Etnia = this.fgValidator.controls['etnia'].value;
    let IdentGenero = this.fgValidator.controls['identGenero'].value;
    let newSurvey = new ModelSurvey();

    //Obtenemos el numero del Id con el numero de encuesta
    this.serviceSurvey.GetData(this.NoEncu).subscribe(
      (datos: ModelSurvey) => {
        let Surveyid = Object.values(datos)[0].id
        
        console.log(Object.values(datos)[0].municipio)

        newSurvey.id = Surveyid
      
        newSurvey.municipio = Municipio;
        newSurvey.direccion = Direccion;
        newSurvey.correo = Correo;
        newSurvey.fijo_cel = Telefono;
        newSurvey.est_civil = Estado_civil;
        newSurvey.intencion = Intencion;
        newSurvey.usuarioId = dataEncu.datos.id;


        this.serviceSurvey.UpdateSurvey(newSurvey).subscribe(
          (datos: ModelSurvey) => {
            alert('Encuesta Actualizada Correctamente');
            this.router.navigate(['/encuesta/prueba']);
            this.validador = false
          },
          (error: any) => {
            alert('Error Actualizando la encuesta');
          }
        );
      },
      (error) => {
        alert("No se encontro la encuesta")
      })
  }


}
