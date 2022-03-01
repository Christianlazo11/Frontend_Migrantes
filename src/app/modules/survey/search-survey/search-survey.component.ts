import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModelSurvey } from "src/app/models/survey.model";
import { SecurityService } from "src/app/services/security.service";
import { SurveyService } from "src/app/services/survey.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-search-survey",
  templateUrl: "./search-survey.component.html",
  styleUrls: ["./search-survey.component.css"],
})
export class SearchSurveyComponent implements OnInit {
  fgEncuesta: FormGroup = this.fb.group({
    noEncuesta: ["", [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private serviceSecurity: SecurityService,
    private serviceSurvey: SurveyService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  //Metodo para inpedir que se escriban letras
  validateFormat(event: any) {
    let key;
    if (event.type === "paste") {
      key = event.clipboardData.getData("text/plain");
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
    if (!regex.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }

  validarNoEncuesta() {
    let NoEncuesta: number = this.fgEncuesta.controls["noEncuesta"].value;

    //Buscar el id del encuestador
    let dataEncu = this.serviceSecurity.GetDataSession();
    console.log(dataEncu.datos.id);
    // console.log(typeof(NoEncuesta))

    this.serviceSurvey.GetData(NoEncuesta).subscribe(
      (datos: ModelSurvey) => {
        // console.log(Object.values(datos)[0].usuarioId)
        // console.log(dataEncu.datos.id)
        let listDatos = JSON.stringify(datos);
        // console.log(listDatos)
        console.log(listDatos.length);

        if (
          listDatos.length != 2 &&
          dataEncu.datos.id == Object.values(datos)[0].usuarioId
        ) {
          Swal.fire({
            title: "Se encontró una encuesta, ¿Desea editarla?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`,
          }).then((result) => {
            if (result.isConfirmed) {
              //Primero se deben activar los campos del formulario para que se puedan visualizar
              // this.fgEncuesta.controls["noEncuesta"].disable();
              this.router.navigate([`/encuesta/editar-encuesta/${NoEncuesta}`]);

              //Llenar los campos de la encuesta con los datos traidos de la base de datos
            } else if (result.isDenied) {
              Swal.fire("Ingrese otro número de encuesta");
              this.fgEncuesta.controls["noEncuesta"].reset();
            }
          });
        } else if (
          listDatos.length != 2 &&
          dataEncu.datos.id != Object.values(datos)[0].usuarioId
        ) {
          Swal.fire("Se encontro encuesta pero no la puede editar");
          this.fgEncuesta.controls["noEncuesta"].reset();
        } else {
          Swal.fire({
            title:
              "No se encontro ninguna encuesta, ¿Desea Crear una encuesta?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              //Primero se deben activar los campos del formulario para que se puedan visualizar
              // this.fgEncuesta.controls["noEncuesta"].disable();
              //Crear la encuesta vacia
              this.CrearEncuestaVacia();
              this.router.navigate([`/encuesta/editar-encuesta/${NoEncuesta}`]);
            } else if (result.isDenied) {
              Swal.fire("Ingrese otro número de encuesta");
              this.fgEncuesta.controls["noEncuesta"].reset();
            }
          });
        }
      },
      (error) => {
        Swal.fire({
          title: "No se encontro ninguna encuesta, ¿Desea Crear una encuesta?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Si",
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            //Primero se deben activar los campos del formulario para que se puedan visualizar
            this.fgEncuesta.controls["noEncuesta"].disable();
            //Crear la encuesta vacia

            this.CrearEncuestaVacia();
            this.router.navigate([`/encuesta/editar-encuesta/${NoEncuesta}`]);
          } else if (result.isDenied) {
            Swal.fire("Ingrese otro número de encuesta");
            this.fgEncuesta.controls["noEncuesta"].reset();
          }
        });
      }
    );
  }

  //Metodo para guardar las respuestas siempre y cuando los campos esten llenos
  CrearEncuestaVacia() {
    let dataEncu = this.serviceSecurity.GetDataSession();

    let NoEncuesta: number =  this.fgEncuesta.controls["noEncuesta"].value


    let newSurvey = new ModelSurvey();

    newSurvey.no_encuesta = NoEncuesta;
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


}
