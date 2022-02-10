import { Component, Directive, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ModelDatos } from 'src/app/models/datos.model';
import { ModelPerson } from 'src/app/models/person.model';
import { ModelSurvey } from 'src/app/models/survey.model';
import { ModelUser } from 'src/app/models/user.model';
import { PersonService } from 'src/app/services/person.service';
import { SurveyService } from 'src/app/services/survey.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
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
    noEncuesta: ['', [Validators.required]],
  })

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
    { name: 'Cédula de ciudadanía venezolana', value: 'Cédula de ciudadanía venezolana' },
    { name: 'PEP o PPPFF', value: 'PEP o PPPFF' },
    { name: 'Pasaporte venezolano', value: 'Pasaporte venezolano' },
    { name: 'Salvo conducto', value: 'Salvo conducto' },
    { name: 'Tarjeta de movilidad fronteriza', value: 'Tarjeta de movilidad fronteriza' }
  ];

  constructor(
    private fb: FormBuilder,
    private serviceSurvey: SurveyService,
    private userService: UserService,
    private servicePerson: PersonService

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
  GuardarRespuestas() {
    let NoEncuesta = this.fgEncuesta.controls['noEncuesta'].value;
    let Municipio = this.fgValidator.controls['municipio'].value;
    let Direccion = this.fgValidator.controls['direccion'].value;
    let Correo = this.fgValidator.controls['correo'].value;
    let Telefono = this.fgValidator.controls['tel'].value;
    let Intencion = this.fgValidator.controls['intencion'].value;
    let DocsCuenta: string[] = this.fgValidator.value.docsSeleccionados;
    let Etnia = this.fgValidator.controls['etnia'].value;
    let IdentGenero = this.fgValidator.controls['identGenero'].value;

    let newSurvey = new ModelSurvey();

    newSurvey.no_encuesta = NoEncuesta;
    newSurvey.municipio = Municipio;
    newSurvey.direccion = Direccion;
    newSurvey.correo = Correo;
    newSurvey.fijo_cel = Telefono;
    newSurvey.intencion = Intencion;
    newSurvey.tipo_doc = String(DocsCuenta);
    newSurvey.grupo_etnico = Etnia;
    newSurvey.ident_genero = IdentGenero;
    newSurvey.usuarioId = "";

    this.serviceSurvey.CreateSurvey(newSurvey).subscribe(
      (datos: ModelSurvey) => {
        alert("Encuesta guardada correctamente")
      },
      (error: any) => {
        alert("Error guardando la encuesta")
      }
    )
  }
  GetListUsers() {
    this.userService.GetData().subscribe((data: ModelUser[]) => {
      this.listUsers = data;
    });
  }

  GetListPeople() {
    this.servicePerson.GetPeople().subscribe((datos: ModelPerson[]) => {
      this.listPeople = datos;
    });
  }

  validarNoEncuesta() {
    let NoEncuesta = (document.getElementById('1') as HTMLInputElement).value
    this.serviceSurvey.GetData(NoEncuesta).subscribe( 
      (datos: ModelSurvey) => {
        console.log(datos)
        
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
            //Llenar los campos de la encuesta con los datos traidos de la base de datos
            

          } else if (result.isDenied) {            
            Swal.fire('Ingrese otro número de encuesta')
            this.validador = false
          }
        })
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
          } else if (result.isDenied) { 
            Swal.fire('Ingrese otro número de encuesta')
            this.validador = false

          }
        })
      }
    );
  }
}
