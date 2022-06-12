import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModelPerson } from "src/app/models/person.model";
import { PersonService } from "src/app/services/person.service";

@Component({
  selector: "app-create-person",
  templateUrl: "./create-person.component.html",
  styleUrls: ["./create-person.component.css"],
})
export class CreatePersonComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({
    name: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    document: ["", [Validators.required]],
    gender: ["", [Validators.required]],
    country: ["", [Validators.required]],
    dateOfBirth: ["", [Validators.required]],
    nivel: ["", [Validators.required]],
    // surveyId: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private servicePerson: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  SavePerson() {
    let nombre = this.fgValidator.controls["name"].value;
    let apellido = this.fgValidator.controls["lastName"].value;
    let documento = this.fgValidator.controls["document"].value;
    let genero = this.fgValidator.controls["gender"].value;
    let nacionalidad = this.fgValidator.controls["country"].value;
    let fechaNacimiento = this.fgValidator.controls["dateOfBirth"].value;
    let nivelEducativo = this.fgValidator.controls["nivel"].value;
    let surveyId = "1521";

    let newPerson = new ModelPerson();
    newPerson.nombre = nombre;
    newPerson.apellido = apellido;
    newPerson.documento = String(documento);
    newPerson.genero = genero;
    newPerson.nacionalidad = nacionalidad;
    newPerson.fechaNac = fechaNacimiento;
    console.log(fechaNacimiento);
    newPerson.nivelEdu = nivelEducativo;
    newPerson.encuestaId = surveyId;

    this.servicePerson.CreatePerson(newPerson).subscribe(
      (datos: ModelPerson) => {
        alert("Persona Creada Correctamente");
        this.router.navigate(["/encuesta/lista-personas"]);
      },
      (error: any) => {
        alert("Error Al Guardar La Persona");
      }
    );
  }
}
