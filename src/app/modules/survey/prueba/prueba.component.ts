import { Component, Directive, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ModelSurvey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
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

  fgValidator: FormGroup = this.fb.group({
    noEncuesta: ['', [Validators.required]],
    municipio: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    correo: ['', [Validators.required,Validators.email]],
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
    private serviceSurvey: SurveyService

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
    let NoEncuesta = this.fgValidator.controls['noEncuesta'].value;
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

  validarNoEncuesta(){
    let NoEncuesta = (document.getElementById('1') as HTMLSelectElement).value
    this.serviceSurvey.GetSurveyById(NoEncuesta).subscribe(
      (datos: ModelSurvey) => {
        alert("Se encontró la encuesta")
      },
      (error: any) => {
        alert("No se encontró ninguna encuesta con este número, desea crear una encuesta?")
      }
    )

    console.log("el numero de encuesta es: ",NoEncuesta)

  }




}
