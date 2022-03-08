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
  idEncu: any

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
    this.GetListPeople();

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
    intencion_permanecer: ['', [Validators.required]],
    localidad_procedencia: ['', [Validators.required]],
    maternidad: ['', [Validators.required]],
    apostillo_tit_bachiller: ['', [Validators.required]],
    apostillo_tit_tec: ['', [Validators.required]],
    lugar_trabajo: ['', [Validators.required]],
    posicion_trabajo: ['', [Validators.required]],
    tipo_viculacion: ['', [Validators.required]],
    

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



  SerchSurvey() {
    this.serviceSurvey.GetData(this.noEncu.replace(":", "")).subscribe(
      (datos: ModelSurvey) => {
        console.log(datos)
        this.idEncu = Object.values(datos)[0].id

        this.fgValidator.controls['municipio'].setValue(Object.values(datos)[0].municipio);
        this.fgValidator.controls['direccion'].setValue(Object.values(datos)[0].direccion);
        this.fgValidator.controls['correo'].setValue(Object.values(datos)[0].correo);
        this.fgValidator.controls['tel'].setValue(Object.values(datos)[0].fijo_cel);
        this.fgValidator.controls['est_civil'].setValue(Object.values(datos)[0].est_civil);
        this.fgValidator.controls['info_nucleo'].setValue(Object.values(datos)[0].info_nucleo);
        this.fgValidator.controls['conf_hogar'].setValue(Object.values(datos)[0].conf_hogar);
        this.fgValidator.controls['quedaron_hijos'].setValue(Object.values(datos)[0].quedaron_hijos);
        this.fgValidator.controls['nacionalidad_pareja'].setValue(Object.values(datos)[0].nacionalidad_pareja);
        this.fgValidator.controls['razon_cruce'].setValue(Object.values(datos)[0].razon_cruce);
        this.fgValidator.controls['razon_cruce'].setValue(Object.values(datos)[0].razon_cruce);
        this.fgValidator.controls['tiempo_estancia'].setValue(Object.values(datos)[0].tiempo_estancia);
        this.fgValidator.controls['razon_arauca'].setValue(Object.values(datos)[0].razon_arauca);
        this.fgValidator.controls['intencion'].setValue(Object.values(datos)[0].intencion);
        this.fgValidator.controls['intencion_permanecer'].setValue(Object.values(datos)[0].intencion_permanecer);
        this.fgValidator.controls['localidad_procedencia'].setValue(Object.values(datos)[0].localidad_procedencia);
        this.fgValidator.controls['maternidad'].setValue(Object.values(datos)[0].maternidad);
        this.fgValidator.controls['apostillo_tit_bachiller'].setValue(Object.values(datos)[0].apostillo_tit_bachiller);
        this.fgValidator.controls['apostillo_tit_tec'].setValue(Object.values(datos)[0].apostillo_tit_tec);
        this.fgValidator.controls['lugar_trabajo'].setValue(Object.values(datos)[0].lugar_trabajo);
        this.fgValidator.controls['posicion_trabajo'].setValue(Object.values(datos)[0].posicion_trabajo);
        this.fgValidator.controls['tipo_viculacion'].setValue(Object.values(datos)[0].tipo_viculacion);
        

      },
      (error) => {
        alert("No se encontró la encuesta")
        this.router.navigate([`/encuesta/buscar-encuesta`]);
      })

  }



  GetListPeople() {

  
    this.serviceSurvey.GetData(this.noEncu.replace(":", "")).subscribe(
      (datos: ModelSurvey) => {
        this.servicePerson.GetPeople(Object.values(datos)[0].id).subscribe((datos: ModelPerson[]) => {
          this.listPeople = datos;
          console.log(this.listPeople)
        });
      },
      (error) => {
        alert("No se encontró la encuesta")
        this.router.navigate([`/encuesta/buscar-encuesta`]);
      })

  }

  SavePerson() {

    this.serviceSurvey.GetData(this.noEncu.replace(":", "")).subscribe(
      (datos: ModelSurvey) => {
        let nombre = this.fgPersona.controls['name'].value;
        let apellido = this.fgPersona.controls['lastName'].value;
        let documento = this.fgPersona.controls['document'].value;
        let genero = this.fgPersona.controls['gender'].value;
        let nacionalidad = this.fgPersona.controls['country'].value;
        let fechaNacimiento = this.fgPersona.controls['dateOfBirth'].value;
        let nivelEducativo = this.fgPersona.controls['nivel'].value;
        let edad = this.fgPersona.controls['edad'].value;
        let profesion = this.fgPersona.controls['profesion'].value;
        let tipo_emprendimiento = this.fgPersona.controls['tipo_emprendimiento'].value;
        let act_economica = this.fgPersona.controls['act_economica'].value;
        let tipo_act_economica = this.fgPersona.controls['tipo_act_economica'].value;
        let runv = this.fgPersona.controls['runv'].value;
        let estatus_migratorio = this.fgPersona.controls['estatus_migratorio'].value;
        let afiliacion_salud = this.fgPersona.controls['afiliacion_salud'].value;
        let docsSeleccionados = this.fgPersona.controls['docsSeleccionados'].value;
        let discapacidad= this.fgPersona.controls['discapacidad'].value;
        let grupo_etnico = this.fgPersona.controls['grupo_etnico'].value;
        let movilidad_migratoria = this.fgPersona.controls['movilidad_migratoria'].value;
        let estudia = this.fgPersona.controls['estudia'].value;
        let grado = this.fgPersona.controls['grado'].value;
        let parentezco = this.fgPersona.controls['parentezco'].value;
        let surveyId = Object.values(datos)[0].id;
    
        let newPerson = new ModelPerson();

        console.log ("los documentos seleccionados son de tipo " +  typeof(docsSeleccionados))
        newPerson.nombre = nombre;
        newPerson.apellido = apellido;
        newPerson.documento = String(documento);
        newPerson.genero = genero;
        newPerson.nacionalidad = nacionalidad;
        newPerson.fechaNac = fechaNacimiento;
        newPerson.nivelEdu = nivelEducativo;
        newPerson.edad = String(edad);
        newPerson.profesion = profesion;
        newPerson.tipo_emprendimiento = tipo_emprendimiento;
        newPerson.act_economica = act_economica;
        newPerson.tipo_act_economica = tipo_act_economica;
        newPerson.runv = runv;
        newPerson.estatus_migratorio = estatus_migratorio;
        newPerson.afiliacion_salud = afiliacion_salud;
        newPerson.docsSeleccionados= String(docsSeleccionados);
        newPerson.discapacidad = discapacidad;
        newPerson.grupo_etnico = grupo_etnico;
        newPerson.movilidad_migratoria = movilidad_migratoria;
        newPerson.estudia = estudia;
        newPerson.grado = grado;
        newPerson.parentezco = parentezco;
        
        newPerson.encuestaId = surveyId;

        console.log(newPerson)
    
        this.servicePerson.CreatePerson(newPerson).subscribe(
          (datos: ModelPerson) => {
            alert('Persona Creada Correctamente');
            this.router.navigate([`/encuesta/editar-encuesta/${this.noEncu.replace(":", "")}`]);
            window.location.reload();
            
          },
          (error: any) => {
            alert('Error Al Guardar La Persona');
          }
        );

      },
      (error) => {
        alert("No se encontró la encuesta")
        this.router.navigate([`/encuesta/buscar-encuesta`]);
      })
   
  }
  DeletePerson(){
    // this.servicePerson.DeletePerson(this.listPeople.id)

  }

  ModificarEncuesta() {

    let dataEncu = this.serviceSecurity.GetDataSession();
    let Municipio = this.fgValidator.controls['municipio'].value;
    let Direccion = this.fgValidator.controls['direccion'].value;
    let Correo = this.fgValidator.controls['correo'].value;
    let Telefono = this.fgValidator.controls['tel'].value;
    let Estado_civil = this.fgValidator.controls['est_civil'].value;
    let Info_nucleo = this.fgValidator.controls['info_nucleo'].value;
    let conf_hogar = this.fgValidator.controls['conf_hogar'].value;
    let quedaron_hijos = this.fgValidator.controls['quedaron_hijos'].value;
    let nacionalidad_pareja = this.fgValidator.controls['nacionalidad_pareja'].value;
    let razon_cruce = this.fgValidator.controls['razon_cruce'].value;
    let tiempo_estancia = this.fgValidator.controls['tiempo_estancia'].value;
    let razon_arauca = this.fgValidator.controls['razon_arauca'].value;
    let Intencion = this.fgValidator.controls['intencion'].value;
    let intencion_permanecer = this.fgValidator.controls['intencion_permanecer'].value;
    let localidad_procedencia = this.fgValidator.controls['localidad_procedencia'].value;
    let maternidad = this.fgValidator.controls['maternidad'].value;
    let apostillo_tit_bachiller = this.fgValidator.controls['apostillo_tit_bachiller'].value;
    let apostillo_tit_tec = this.fgValidator.controls['apostillo_tit_tec'].value;
    let lugar_trabajo = this.fgValidator.controls['lugar_trabajo'].value;
    let posicion_trabajo = this.fgValidator.controls['posicion_trabajo'].value;
    let tipo_viculacion = this.fgValidator.controls['tipo_viculacion'].value;
    
    let newSurvey = new ModelSurvey();

    //Obtenemos el numero del Id con el numero de encuesta
    
    console.log(typeof(this.noEncu))

    
    newSurvey.id = this.idEncu;
    newSurvey.no_encuesta = this.noEncu.replace(":","");
    newSurvey.municipio = Municipio;
    newSurvey.direccion = Direccion;
    newSurvey.correo = Correo;
    newSurvey.fijo_cel = Telefono;

    newSurvey.est_civil = Estado_civil;
    newSurvey.info_nucleo = Info_nucleo;
    // console.log("El hogar esta conformado por " + conf_hogar + " y es de tipo " + typeof(conf_hogar))
    newSurvey.conf_hogar = String(conf_hogar);
    newSurvey.quedaron_hijos = quedaron_hijos;
    newSurvey.nacionalidad_pareja = nacionalidad_pareja;
    newSurvey.razon_cruce = razon_cruce;
    newSurvey.tiempo_estancia = tiempo_estancia;
    newSurvey.razon_arauca = razon_arauca;

    newSurvey.intencion = Intencion;
    newSurvey.intencion_permanecer = intencion_permanecer;
    newSurvey.localidad_procedencia = localidad_procedencia;
    newSurvey.maternidad = maternidad;
    newSurvey.apostillo_tit_bachiller = apostillo_tit_bachiller;
    newSurvey.apostillo_tit_tec = apostillo_tit_tec;
    newSurvey.lugar_trabajo = lugar_trabajo;
    newSurvey.posicion_trabajo = posicion_trabajo;
    newSurvey.tipo_viculacion = tipo_viculacion;

    newSurvey.usuarioId = dataEncu.datos.id;
 
    this.serviceSurvey.UpdateSurvey(newSurvey).subscribe(
      (datos: ModelSurvey) => {
        alert('Encuesta Actualizada Correctamente');
        this.router.navigate(['/encuesta/buscar-encuesta']);
      },
      (error: any) => {
        alert('Error Actualizando la encuesta');
      }
    )

  }


}
