import { Component, Directive, OnInit } from '@angular/core';
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
import { SurveyRoutingModule } from '../survey-routing.module';



@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})


export class PruebaComponent implements OnInit {

  item: any
  preguntas: any
  data: any
  validador = false
  listSurvey: ModelSurvey[] = [];
  listUsers: ModelUser[] = [];
  listPeople: ModelPerson[] = [];

  fgEncuesta: FormGroup = this.fb.group({
    // noEncuesta: ['', [Validators.required]]
    noEncuesta: ['', [Validators.required,Validators.pattern(/^\d+$/)]]
  });

  // this.fgEncuesta.valueChanges.subscribe(values =>{

  // });
  

  fgValidator: FormGroup = this.fb.group({
    municipio: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.required]],
    intencion: ['', [Validators.required]],
    docsSeleccionados: new FormArray([]),
    etnia: ['', [Validators.required]],
    identGenero: ['', [Validators.required]],
    orSexual: ['', [Validators.required]]
  })
  // Checkbox intención
  //************************************************************************ */

  docs: Array<any> = [
    { name: 'Acta de nacimiento', value: 'Acta de nacimiento' },
    { name: 'Cédula de ciudadanía venezolana', value: 'Cédula de ciudadanía venezolana' },
    { name: 'PPT', value: 'PPT' },
    { name: 'Pasaporte venezolano', value: 'Pasaporte venezolano' },
    { name: 'Salvo conducto', value: 'Salvo conducto' },
    { name: 'TMF', value: 'TMF' },
    { name: 'Cédula/TI/RC Colombia', value: 'Cédula/TI/RC Colombia' },
    { name: 'Solución ETPV', value: 'Solución ETPV' },
    { name: 'Visa laboral o estudiantil', value: 'Visa laboral o estudiantil' },
    { name: 'Ninguno', value: 'Ninguno' }
  ];

  constructor(
    private fb: FormBuilder,
    private serviceSurvey: SurveyService,
    private userService: UserService,
    private servicePerson: PersonService,
    private serviceSecurity: SecurityService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  onCheckboxChange(event: any) {
    const docsSeleccionados = (this.fgValidator.controls['docsSeleccionados'] as FormArray);
    if (event.target.checked) {
      docsSeleccionados.push(new FormControl(event.target.value));

    } else {
      const index = docsSeleccionados.controls
        .findIndex(x => x.value === event.target.value);
      docsSeleccionados.removeAt(index);
    }
  }


  //*********************************************** */

  ngOnInit(): void {

    this.preguntas = {
      1: {
        "Descripcion": "Número de encuesta",
        "Tipo": 'text',
        "NoOp": [""]
      },
      2: {
        "Descripcion": "Municipio",
        "Tipo": "select",
        "NoOp": ["Arauca", "Arauquita", "Saravena"]
      },
      3: {
        "Descripcion": "Correo",
        "Tipo": "email",
        "NoOp": [""]
      },
      4: {
        "Descripcion": "¿2. Una vez ingresó a Colombia cuál fue su intención?",
        "Tipo": "select",
        "NoOp": [
          "Establecer su domicilio en el país",
          "Transitar hacia otro país",
          "Trabajar por un tiempo para regresar a Venezuela",
          "Encontrarse con su familia"
        ]
      },
      5: {
        "Descripcion": "3. ¿Con que documento cuenta?",
        "Tipo": "checkbox",
        "NoOp": [
          "Cédula de ciudadanía venezolana",
          "PEP o PPPFF",
          "Pasaporte venezolano",
          "Salvo conducto",
          "Tarjeta de movilidad fronteriza"
        ]

      },
      6: {
        "Descripcion": "4. De acuerdo con su cultura, pueblo o rasgos físicos; usted se auto reconoce como?",
        "Tipo": "select",
        "NoOp": [
          "Mestizo",
          "Afrodescendiente",
          "Indígena",
          "Otro"
        ]
      },
      7: {
        "Descripcion": "5. ¿Cuál es su identidad de género?",
        "Tipo": "select",
        "NoOp": [
          "Hombre",
          "Mujer",
          "Hombre trans",
          "Mujer trans",
          "Otro"
        ]
      },
      8: {
        "Descripcion": "6. ¿Cuál de las siguientes opciones describe mejor su orientación sexual?",
        "Tipo": "select",
        "NoOp": [
          "Hombre",
          "Mujer",
          "Hombre trans",
          "Mujer trans",
          "Otro"
        ]

      }
    };
    this.data = Object.values(this.preguntas)
  }
  //Metodo para guardar las respuestas siempre y cuando los campos esten llenos
  CrearEncuesta() {
    let dataEncu = this.serviceSecurity.GetDataSession();

    let NoEncuesta: number = this.fgEncuesta.controls['noEncuesta'].value;


    let newSurvey = new ModelSurvey();

    newSurvey.no_encuesta = NoEncuesta;
    newSurvey.municipio = "-";
    newSurvey.direccion = "-";
    newSurvey.correo = "-";
    newSurvey.fijo_cel = "-";
    newSurvey.est_civil= "-";
    newSurvey.info_nucleo= "-";
   

    newSurvey.intencion = "-";

    newSurvey.usuarioId = dataEncu.datos.id;

    console.log(newSurvey)

    this.serviceSurvey.CreateSurvey(newSurvey).subscribe(
      (datos: ModelSurvey) => {
        alert("Encuesta guardada correctamente")
      },
      (error: any) => {
        alert("Error guardando la encuesta")
      }
    )
  }
  //Metodo para modfiicar encuesta
  ModificarEncuesta() {

    let dataEncu = this.serviceSecurity.GetDataSession();

    let NoEncuesta: number = this.fgEncuesta.controls['noEncuesta'].value;
    let Municipio = this.fgValidator.controls['municipio'].value;
    let Direccion = this.fgValidator.controls['direccion'].value;
    let Correo = this.fgValidator.controls['correo'].value;
    let Telefono = this.fgValidator.controls['tel'].value;
    let Intencion = this.fgValidator.controls['intencion'].value;
    let DocsCuenta: string[] = this.fgValidator.value.docsSeleccionados;
    let Etnia = this.fgValidator.controls['etnia'].value;
    let IdentGenero = this.fgValidator.controls['identGenero'].value;
    let newSurvey = new ModelSurvey();

    //Obtenemos el numero del Id con el numero de encuesta

    this.serviceSurvey.GetData(NoEncuesta).subscribe(
      (datos: ModelSurvey) => {
        let Surveyid = Object.values(datos)[0].id

        newSurvey.id = Surveyid
        newSurvey.no_encuesta = NoEncuesta;
        newSurvey.municipio = Municipio;
        newSurvey.direccion = Direccion;
        newSurvey.correo = Correo;
        newSurvey.fijo_cel = Telefono;
        newSurvey.intencion = Intencion;
        newSurvey.usuarioId = dataEncu.datos.id;


        this.serviceSurvey.UpdateSurvey(newSurvey).subscribe(
          (datos: ModelSurvey) => {
            alert('Encuesta Actualizada Correctamente');
            this.router.navigate(['/encuesta/prueba']);
            this.validador = false
            this.fgEncuesta.controls['noEncuesta'].enable()
            this.fgEncuesta.controls['noEncuesta'].reset()
            

          },
          (error: any) => {
            alert('Error Actualizando la encuesta');
            this.fgEncuesta.controls['noEncuesta'].reset()
          }
        );

      },
      (error) => {
        alert("No se encontro la encuesta")
        this.fgEncuesta.controls['noEncuesta'].reset()

      })
  }

  GetListUsers() {
    this.userService.GetData().subscribe((data: ModelUser[]) => {
      this.listUsers = data;
    });
  }

  GetListPeople() {
    this.servicePerson.GetPeople("123").subscribe((datos: ModelPerson[]) => {
      this.listPeople = datos;
    });
  }

  validarNoEncuesta() {
    let NoEncuesta: number = this.fgEncuesta.controls['noEncuesta'].value;


    //Buscar el id del encuestador
    let dataEncu = this.serviceSecurity.GetDataSession();
    console.log(dataEncu.datos.id)
    // console.log(typeof(NoEncuesta))
    
    this.serviceSurvey.GetData(NoEncuesta).subscribe(
      (datos: ModelSurvey) => {
        // console.log(Object.values(datos)[0].usuarioId)
        // console.log(dataEncu.datos.id)
        let listDatos = JSON.stringify(datos)
        // console.log(listDatos)
        console.log(listDatos.length)

        if (listDatos.length != 2 && (dataEncu.datos.id == Object.values(datos)[0].usuarioId || dataEncu.datos.rol == "administrador")) {
          Swal.fire({
            title: 'Se encontró una encuesta, ¿Desea editarla?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Primero se deben activar los campos del formulario para que se puedan visualizar
              this.validador = true
              this.fgEncuesta.controls['noEncuesta'].disable()

              //Llenar los campos de la encuesta con los datos traidos de la base de datos
            } else if (result.isDenied) {
              Swal.fire('Ingrese otro número de encuesta')
              this.validador = false
              this.fgEncuesta.controls['noEncuesta'].reset()
            }
          })
        }
        else if (listDatos.length != 2 && dataEncu.datos.id != Object.values(datos)[0].usuarioId) {
          Swal.fire('Se encontro encuesta pero no la puede editar')
          this.fgEncuesta.controls['noEncuesta'].reset()
        }
        else {
          Swal.fire({
            title: 'No se encontro ninguna encuesta, ¿Desea Crear una encuesta?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              //Primero se deben activar los campos del formulario para que se puedan visualizar
              this.validador = true
              this.fgEncuesta.controls['noEncuesta'].disable()
              //Crear la encuesta vacia
              this.CrearEncuesta()
            } else if (result.isDenied) {
              Swal.fire('Ingrese otro número de encuesta')
              this.fgEncuesta.controls['noEncuesta'].reset()
              this.validador = false
            }
          })

        }
      },
      (error) => {
        Swal.fire({
          title: 'No se encontro ninguna encuesta, ¿Desea Crear una encuenta?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            //Primero se deben activar los campos del formulario para que se puedan visualizar
            this.validador = true
            this.fgEncuesta.controls['noEncuesta'].disable()
            //Crear la encuesta vacia
            this.CrearEncuesta()
          } else if (result.isDenied) {
            Swal.fire('Ingrese otro número de encuesta')
            this.fgEncuesta.controls['noEncuesta'].reset()
            this.validador = false
          }
        })
      }
    );
  }

}
