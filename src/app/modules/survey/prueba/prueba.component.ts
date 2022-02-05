import { Component, Directive, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})


export class PruebaComponent implements OnInit {
  item : any
  preguntas: any
  data : any

  fgValidator: FormGroup = this.fb.group({
    noEncuesta: ['',[Validators.required]],
    municipio: ['',[Validators.required]],
    correo: ['',[Validators.required]],
    intencion: ['',[Validators.required]],
    docCuenta: ['',[Validators.required]],
    etnia: ['',[Validators.required]],
    didentGenero: ['',[Validators.required]],
    orSexual: ['',[Validators.required]]
  })
// Checkbox intención
//************************************************************************ */
  form: FormGroup;
  intenciones: Array<any> = [
    { name: 'Cédula de ciudadanía venezolana', value: 'Cédula de ciudadanía venezolana' },
    { name: 'PEP o PPPFF', value: 'PEP o PPPFF' },
    { name: 'Pasaporte venezolano', value: 'Pasaporte venezolano' },
    { name: 'Salvo conducto', value: 'Salvo conducto' },
    { name: 'Tarjeta de movilidad fronteriza', value: 'Tarjeta de movilidad fronteriza' }
  ];
  

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      intencionSeleccionada:  new FormArray([])
     });

  }
  onCheckboxChange(event: any) {
    const intencionSeleccionada = (this.form.controls['intencionSeleccionada'] as FormArray);
    if (event.target.checked) {
      intencionSeleccionada.push(new FormControl(event.target.value));
    } else {
      const index = intencionSeleccionada.controls
      .findIndex(x => x.value === event.target.value);
      intencionSeleccionada.removeAt(index);
    }
  }
  submit() {
    console.log(this.form.value);
  }
  //*********************************************** */

  ngOnInit(): void { 
    this.preguntas = {
      1: {
        "Descripcion": "Número de encuesta",
        "Tipo":'text',
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
  
  guardarRespuesta(){
    let respPreguntas: string[]=[]
  

  }

}
