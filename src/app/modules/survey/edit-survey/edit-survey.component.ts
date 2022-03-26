import { Component, HostListener, OnInit } from '@angular/core';
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
  ServInstiSeleccionados: Number[] = [];
  PServInstiSeleccionados: Number[] = [];
  TipoNeceBasicaSeleccionados: Number[] = [];
  TipoAyuRecibidaIESeleccionados: Number[] = [];
  TipoAyuRecibidaCISeleccionados: Number[] = [];
  SituaEspeRetornadoSeleccionados: Number[] = [];

  // @HostListener('window:beforeunload')
  // onUnLoad(){
  //   const data = new FormData();
  //   // alert("Desea salir de la aplicacion?")

  //   data.append('name', 'abc');
  //   data.append('location', 'world');
  //   navigator.sendBeacon('http://www.mysitioweb.com/api/v1/endpoint', data);
  //   // const confirmar = confirm("Desea salir de la aplicacion?");
  //   // // alert("Desea salir de la aplicacion?")
  //   console.log("hola Mundo")
  //   this.serviceSecurity.DeleteDataSession();
  //   this.router.navigate(['/inicio']);

  //   return false;

  // }

  lista:string[]=["Ha recibido apoyo del sector Salud","Ha recibido apoyo del sector educacion",
   "Ha recibido apoyo de Migracion Colombia","Ha recibido apoyo de Min.Trabajo", "Ha recibido apoyo de la Alcaldia",
   "Ha recibido apoyo de las Ongs"];

  seleccionados:string[]=[];

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

  //Creamos el formulario Encuesta
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
    apostillo_tit_profesional: ['', [Validators.required]],
    apostillo_otro_titulo: ['', [Validators.required]],
    lugar_trabajo: ['', [Validators.required]],
    posicion_trabajo: ['', [Validators.required]],
    tipo_vinculacion: ['', [Validators.required]],
    obtener_ingresos: ['', [Validators.required]],
    ingresos_mensuales: ['', [Validators.required]],
    invierte_salario: ['', [Validators.required]],
    intencion_tiempo_estancia: ['', [Validators.required]],
    interes_salud_publica: ['', [Validators.required]],
    institucion_cubrio_gastos: ['', [Validators.required]],
    servicios_institucionales: new FormArray([]),
    
    miselect: ['', [Validators.required]],
    clase_vivienda: ['', [Validators.required]],
    tipo_vivienda: ['', [Validators.required]],
    tipo_necesidad_basica: new FormArray([]),
    tipo_ayuda_recibida_IE: new FormArray([]),
    tipo_ayuda_recibida_CI: new FormArray([]),

    causal_de_retorno:['', [Validators.required]],
    situa_especial_retornado: new FormArray([]),
    años_estancia_vzla:['', [Validators.required]],

  });
  //Creamos el formulario Persona
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

  SISeleccionados = (this.fgValidator.controls['servicios_institucionales'] as FormArray);
  PSISeleccionados = (this.fgValidator.controls['servicios_institucionales'] as FormArray);
  TNBSeleccionados = (this.fgValidator.controls['tipo_necesidad_basica'] as FormArray);
  TARIESeleccionados = (this.fgValidator.controls['tipo_ayuda_recibida_IE'] as FormArray);
  TARCISeleccionados = (this.fgValidator.controls['tipo_ayuda_recibida_CI'] as FormArray);
  SERSeleccionados = (this.fgValidator.controls['situa_especial_retornado'] as FormArray);

  // Checkbox Tipo de documento
  //************************************************************************ */
  docs: Array<any> = [
    { name: 'Acta de nacimiento', value: '0' },
    { name: 'Cédula venezolana', value: '1' },
    { name: 'PPT', value: '2' },
    { name: 'Pasaporte venezolano', value: '3' },
    { name: 'Salvo conducto', value: '4' },
    { name: 'TMF', value: '5' },
    { name: 'Cédula/TI/RC Colombia', value: '6' },
    { name: 'Solución ETPV', value: '7' },
    { name: 'Visa laboral o estudiantil', value: '8' },
    { name: 'Ninguno', value: '9' }
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

   // Checkbox Servicios institucionales
  //************************************************************************ */
  servInsti: Array<any> = [
    { name: '¿Sector salud le ha brindado atencion médica, hospitalaria y de vacunacion?', value: '0' },
    { name: '¿Sector educacion, le ha permitido que sus hijos estudien?', value: '1' },
    { name: '¿Migración Colombia, le ha brindado atención oportuna y eficiente', value: '2' },
    { name: '¿Min.del Trabajo, le ha brindado apoyo en solución de conflictos laborales', value: '3' },
    { name: '¿La alcaldía a través de la Sec. de Gobierno le ha brindado apoyo y orientacion requerida.?', value: '4' },
    { name: '¿Las ONGs nacionales e internacionales, le han brindado el apoyo y/o cooperación o ayuda humanitaria?', value: '5' },
  ];
  onCheckboxChangeSI(event: any) {
    if (event.target.checked) {
      this.SISeleccionados.push(new FormControl(event.target.value));
    } else {
      const index = this.SISeleccionados.controls
        .findIndex(x => x.value === event.target.value);
      this.SISeleccionados.removeAt(index);
    }
    console.log(this.SISeleccionados)
  }

     // Checkbox Tipo de necesidades básicas
  //************************************************************************ */
  tipoNeceBasica: Array<any> = [
    { name: 'a) Contacto con familiares', value: '0' },
    { name: 'b) Recuperacion', value: '1' },
    { name: 'c) Acceso a fuente regulares de financiacion', value: '2' },
    { name: 'd) acceso a vivienda', value: '3' },
    { name: 'e) Generación de ingresos', value: '4' },
    { name: 'f) Acceso al trabajo', value: '5' },
    { name: 'g) Apostillar documentos', value: '6' },
    { name: 'h) Servicios sociales', value: '7' },
    { name: 'i) Educacion', value: '8' },
    { name: 'j) Acceso a nutrición / alimentos', value: '9' },
    { name: 'k) Salud y seguridad social', value: '10' },
    { name: 'l) Acceso a medicamentos', value: '11' },
    { name: 'm) Asilo y refugio', value: '12' },
    { name: 'n) Generación de ingresos', value: '13' },
    { name: 'o) Otra, cuál', value: '14' },
  ];
  onCheckboxChangeTNB(event: any) {
    if (event.target.checked) {
      this.TNBSeleccionados.push(new FormControl(event.target.value));
    } else {
      const index = this.TNBSeleccionados.controls
        .findIndex(x => x.value === event.target.value);
      this.TNBSeleccionados.removeAt(index);
    }

  }

       // Checkbox Tipo de ayuda recibida IE
  //************************************************************************ */
  tipoAyuRecIEBasica: Array<any> = [
    { name: 'a) Ayuda Educativa', value: '0' },
    { name: 'b) Ayuda de Salud', value: '1' },
    { name: 'c) Ayuda de medicamentos', value: '2' },
    { name: 'd) Bono de alimentación', value: '3' },
    { name: 'e) Kit de alimentos', value: '4' },
    { name: 'f) Kit de aseo', value: '5' },
    { name: 'g) Kit de ropa', value: '6' },
    { name: 'h) Kit de cosina', value: '7' },
    { name: 'i) Beneficios financieros', value: '8' },
    { name: 'j) Ingreso solidario', value: '9' },
    { name: 'k) Adulto mayor', value: '10' },
    { name: 'l) Jóvenes en acción', value: '11' },
    { name: 'm) Vivienda', value: '12' },
    { name: 'n) Ayuda funeraria', value: '13' },
    { name: 'o) Otras ayudas', value: '14' },
  ];
  onCheckboxChangeTARIE(event: any) {
    if (event.target.checked) {
      this.TARIESeleccionados.push(new FormControl(event.target.value));
    } else {
      const index = this.TARIESeleccionados.controls
        .findIndex(x => x.value === event.target.value);
      this.TARIESeleccionados.removeAt(index);
    }

  }

  // Checkbox Tipo de ayuda recibida CI
  //************************************************************************ */
  tipoAyuRecCIBasica: Array<any> = [
    { name: 'a) Ayuda Educativa', value: '0' },
    { name: 'b) Ayuda de Salud', value: '1' },
    { name: 'c) Ayuda de medicamentos', value: '2' },
    { name: 'd) Bono de alimentación', value: '3' },
    { name: 'e) Kit de alimentos', value: '4' },
    { name: 'f) Kit de aseo', value: '5' },
    { name: 'g) Kit de ropa', value: '6' },
    { name: 'h) Kit de cosina', value: '7' },
    { name: 'i) Beneficios financieros', value: '8' },
    { name: 'j) Ingreso solidario', value: '9' },
    { name: 'k) Adulto mayor', value: '10' },
    { name: 'l) Jóvenes en acción', value: '11' },
    { name: 'm) Vivienda', value: '12' },
    { name: 'n) Ayuda funeraria', value: '13' },
    { name: 'o) Otras ayudas', value: '14' },
  ];
  onCheckboxChangeTARCI(event: any) {
    if (event.target.checked) {
      this.TARCISeleccionados.push(new FormControl(event.target.value));
    } else {
      const index = this.TARCISeleccionados.controls
        .findIndex(x => x.value === event.target.value);
      this.TARCISeleccionados.removeAt(index);
    }

  }

  // Checkbox situación especial de retornados
  //************************************************************************ */
  situaEspecialRetornado: Array<any> = [
    { name: 'a) Tiene propiedades en Venezuela', value: '0' },
    { name: 'b) Su familia se quedó en Venezuela', value: '1' },
    { name: 'c) Tiene familiares en el departamento de Arauca', value: '2' },
    { name: 'd) Las Instituciones del Estado le han brindado apoyo', value: '3' },
    { name: 'e) Desea regresar a Venezuela', value: '4' },
    { name: 'f) Otra razón', value: '5' },
  ];
  onCheckboxChangeSER(event: any) {
    if (event.target.checked) {
      this.SERSeleccionados.push(new FormControl(event.target.value));
    } else {
      const index = this.SERSeleccionados.controls
        .findIndex(x => x.value === event.target.value);
      this.SERSeleccionados.removeAt(index);
    }

  }

  

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
    this.SerchSurvey(this.ServInstiSeleccionados, this.TipoNeceBasicaSeleccionados, this.TipoAyuRecibidaIESeleccionados, this.TipoAyuRecibidaCISeleccionados, this.SituaEspeRetornadoSeleccionados);
    this.GetListPeople();

    this.serviceSurvey.GetData(this.noEncu.replace(":", "")).subscribe(
      (datos: ModelSurvey) => {

      for (let i = 0; i < Number(Object.values(datos)[0].servicios_institucionales?.split(",").length); i++) {
        this.SISeleccionados.push(new FormControl(Object.values(datos)[0].servicios_institucionales?.split(",")[i]));
      }
  
      for (let i = 0; i < Number(Object.values(datos)[0].tipo_necesidad_basica?.split(",").length); i++) {
        this.TNBSeleccionados.push(new FormControl(Object.values(datos)[0].tipo_necesidad_basica?.split(",")[i]));
      }
      

      for (let i = 0; i < Number(Object.values(datos)[0].tipo_ayuda_recibida_IE?.split(",").length); i++) {
        this.TARIESeleccionados.push(new FormControl(Object.values(datos)[0].tipo_ayuda_recibida_IE?.split(",")[i]));
      }

      


      for (let i = 0; i < Number(Object.values(datos)[0].tipo_ayuda_recibida_CI?.split(",").length); i++) {
        this.TARCISeleccionados.push(new FormControl(Object.values(datos)[0].tipo_ayuda_recibida_CI?.split(",")[i]));
      }

      for (let i = 0; i < Number(Object.values(datos)[0].situa_especial_retornado?.split(",").length); i++) {
        this.SERSeleccionados.push(new FormControl(Object.values(datos)[0].situa_especial_retornado?.split(",")[i]));
      }


    })
    
  }


  SerchSurvey(ServInstiSeleccionados: Number[],  TipoNeceBasicaSeleccionados: Number[], TipoAyuRecibidaIESeleccionados: Number[], TipoAyuRecibidaCISeleccionados: Number[], SituaEspeRetornadoSeleccionados: Number[]) {
    this.serviceSurvey.GetData(this.noEncu.replace(":", "")).subscribe(
      (datos: ModelSurvey) => {
        // console.log(Object.values(datos)[0].servicios_institucionales.split(",")[0])
        this.idEncu = Object.values(datos)[0].id

        console.log("Tipo de ayuda recibida IE: " + Object.values(datos)[0].tipo_ayuda_recibida_IE.length)
        console.log("Tipo de ayuda recibida CI: " + Object.values(datos)[0].tipo_ayuda_recibida_CI.length)
        console.log("Nececidad basica: " + Object.values(datos)[0].tipo_necesidad_basica.length)

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
       
        this.fgValidator.controls['tiempo_estancia'].setValue(Object.values(datos)[0].tiempo_estancia);
        this.fgValidator.controls['razon_arauca'].setValue(Object.values(datos)[0].razon_arauca);
        this.fgValidator.controls['intencion'].setValue(Object.values(datos)[0].intencion);
        this.fgValidator.controls['intencion_permanecer'].setValue(Object.values(datos)[0].intencion_permanecer);
        this.fgValidator.controls['localidad_procedencia'].setValue(Object.values(datos)[0].localidad_procedencia);
        this.fgValidator.controls['maternidad'].setValue(Object.values(datos)[0].maternidad);
        this.fgValidator.controls['apostillo_tit_bachiller'].setValue(Object.values(datos)[0].apostillo_tit_bachiller);
        this.fgValidator.controls['apostillo_tit_tec'].setValue(Object.values(datos)[0].apostillo_tit_tec);
        this.fgValidator.controls['apostillo_tit_profesional'].setValue(Object.values(datos)[0].apostillo_tit_profesional);
        this.fgValidator.controls['apostillo_otro_titulo'].setValue(Object.values(datos)[0].apostillo_otro_titulo); 
        
        this.fgValidator.controls['lugar_trabajo'].setValue(Object.values(datos)[0].lugar_trabajo);
        this.fgValidator.controls['posicion_trabajo'].setValue(Object.values(datos)[0].posicion_trabajo);
        this.fgValidator.controls['tipo_vinculacion'].setValue(Object.values(datos)[0].tipo_vinculacion);
        this.fgValidator.controls['obtener_ingresos'].setValue(Object.values(datos)[0].obtener_ingresos);
        this.fgValidator.controls['ingresos_mensuales'].setValue(Object.values(datos)[0].ingresos_mensuales);
        this.fgValidator.controls['invierte_salario'].setValue(Object.values(datos)[0].invierte_salario);
        this.fgValidator.controls['intencion_tiempo_estancia'].setValue(Object.values(datos)[0].intencion_tiempo_estancia);
        this.fgValidator.controls['interes_salud_publica'].setValue(Object.values(datos)[0].interes_salud_publica);
        this.fgValidator.controls['institucion_cubrio_gastos'].setValue(Object.values(datos)[0].institucion_cubrio_gastos);
                
        for (let i = 0; i < Number(Object.values(datos)[0].servicios_institucionales.length-1); i++) {
          ServInstiSeleccionados.push(Number(Object.values(datos)[0].servicios_institucionales.split(",")[i]))
        }
        for (let i = 0; i < Number(Object.values(datos)[0].tipo_necesidad_basica.length-1); i++) {
          TipoNeceBasicaSeleccionados.push(Number(Object.values(datos)[0].tipo_necesidad_basica.split(",")[i]))
        }

        for (let i = 0; i < Number(Object.values(datos)[0].tipo_ayuda_recibida_IE.length-1); i++) {
          TipoAyuRecibidaIESeleccionados.push(Number(Object.values(datos)[0].tipo_ayuda_recibida_IE.split(",")[i]))

        }


        for (let i = 0; i < Number(Object.values(datos)[0].tipo_ayuda_recibida_CI.length-1); i++) {
          TipoAyuRecibidaCISeleccionados.push(Number(Object.values(datos)[0].tipo_ayuda_recibida_CI.split(",")[i]))
        }

        for (let i = 0; i < Number(Object.values(datos)[0].situa_especial_retornado.length-1); i++) {
          SituaEspeRetornadoSeleccionados.push(Number(Object.values(datos)[0].situa_especial_retornado.split(",")[i]))
        }
        
        

        // console.log(ServInstiSeleccionados)

        this.fgValidator.controls['miselect'].setValue(Object.values(datos)[0].miselect);
        this.fgValidator.controls['clase_vivienda'].setValue(Object.values(datos)[0].clase_vivienda);
        this.fgValidator.controls['tipo_vivienda'].setValue(Object.values(datos)[0].tipo_vivienda);
        this.fgValidator.controls['causal_de_retorno'].setValue(Object.values(datos)[0].causal_de_retorno);        
        
        this.fgValidator.controls['años_estancia_vzla'].setValue(Object.values(datos)[0].años_estancia_vzla);

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
        //Tipo de Documento
        let docsSeleccionados: string[] = this.fgPersona.value.docsSeleccionados;
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
    let apostillo_tit_profesional = this.fgValidator.controls['apostillo_tit_profesional'].value;
    let apostillo_otro_titulo = this.fgValidator.controls['apostillo_otro_titulo'].value;

    let lugar_trabajo = this.fgValidator.controls['lugar_trabajo'].value;
    let posicion_trabajo = this.fgValidator.controls['posicion_trabajo'].value;
    let tipo_vinculacion = this.fgValidator.controls['tipo_vinculacion'].value;
    let obtener_ingresos = this.fgValidator.controls['obtener_ingresos'].value;
    let ingresos_mensuales = this.fgValidator.controls['ingresos_mensuales'].value;
    let invierte_salario = this.fgValidator.controls['invierte_salario'].value;
    let intencion_tiempo_estancia = this.fgValidator.controls['intencion_tiempo_estancia'].value;
    let interes_salud_publica = this.fgValidator.controls['interes_salud_publica'].value;
    let institucion_cubrio_gastos = this.fgValidator.controls['institucion_cubrio_gastos'].value;
   
    let servicios_institucionales: string[] = this.SISeleccionados.value;
    let miselect = this.fgValidator.controls['miselect'].value;
    let clase_vivienda = this.fgValidator.controls['clase_vivienda'].value;
    let tipo_vivienda = this.fgValidator.controls['tipo_vivienda'].value;
    let tipo_necesidad_basica: string[] = this.TNBSeleccionados.value;

    let tipo_ayuda_recibida_IE: string[] = this.TARIESeleccionados.value;
    let tipo_ayuda_recibida_CI: string[] = this.TARCISeleccionados.value;
    let situa_especial_retornado: string[] = this.SERSeleccionados.value;
      
    let causal_de_retorno = this.fgValidator.controls['causal_de_retorno'].value;
    let años_estancia_vzla = this.fgValidator.controls['años_estancia_vzla'].value;


    let newSurvey = new ModelSurvey();
    

    //Obtenemos el numero del Id con el numero de encuesta
    
    // console.log(typeof(this.noEncu))

    
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
    newSurvey.apostillo_tit_profesional = apostillo_tit_profesional;
    newSurvey.apostillo_otro_titulo = apostillo_otro_titulo ;

    newSurvey.lugar_trabajo = lugar_trabajo;
    newSurvey.posicion_trabajo = posicion_trabajo;
    newSurvey.tipo_vinculacion = tipo_vinculacion;
    newSurvey.obtener_ingresos = obtener_ingresos;
    newSurvey.ingresos_mensuales = ingresos_mensuales;
    newSurvey.invierte_salario = invierte_salario;
    newSurvey.intencion_tiempo_estancia = intencion_tiempo_estancia;
    newSurvey.interes_salud_publica = interes_salud_publica;
    newSurvey.institucion_cubrio_gastos = institucion_cubrio_gastos;
    
    newSurvey.servicios_institucionales = String(servicios_institucionales);
    newSurvey.miselect = miselect;
    //          console.log("miselect " + typeof(miselect));
    newSurvey.clase_vivienda = clase_vivienda;
    newSurvey.tipo_vivienda = tipo_vivienda;
    
    newSurvey.tipo_necesidad_basica = String(tipo_necesidad_basica);
    newSurvey.tipo_ayuda_recibida_IE = String(tipo_ayuda_recibida_IE);
    newSurvey.tipo_ayuda_recibida_CI = String(tipo_ayuda_recibida_CI);
    newSurvey.situa_especial_retornado = String(situa_especial_retornado);
    
    newSurvey.causal_de_retorno = causal_de_retorno;
    newSurvey.años_estancia_vzla = años_estancia_vzla;

    
    newSurvey.usuarioId = dataEncu.datos.id;

    console.log(newSurvey)
 
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
