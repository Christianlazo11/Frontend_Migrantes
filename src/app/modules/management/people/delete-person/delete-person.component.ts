import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelPerson } from 'src/app/models/person.model';
import { ModelSurvey } from 'src/app/models/survey.model';
import { PersonService } from 'src/app/services/person.service';
import { SurveyService } from 'src/app/services/survey.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.css']
})
export class DeletePersonComponent implements OnInit {
  id: string = '';

  constructor(
    private servicePerson: PersonService,
    private serviceSurvey: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    Swal.fire({
      title: "¿Esta seguro de eliminar esta persona del nucleo familiar?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicePerson.GetPeopleById(this.id).subscribe(
          (datos: ModelPerson) => {

            let id_encuesta = String(datos.encuestaId)
          
            this.serviceSurvey.GetSurveyById(id_encuesta).subscribe(
              (datosSurvey: ModelSurvey) => {
                let no_encu = String(datosSurvey.no_encuesta)

                this.servicePerson.DeletePerson(this.id).subscribe(
                  (datos:any) => {
                    alert("Persona eliminada correctamente")
                    this.router.navigate([`/encuesta/editar-encuesta/${no_encu}`]);
                  },
                  (error: any) => {
                    alert('Error Al eliminar La Persona');
                    this.router.navigate([`/encuesta/editar-encuesta/${no_encu}`]);
                  }
                )
              }
            )
          });
        
      } else if (result.isDenied) {
        this.servicePerson.GetPeopleById(this.id).subscribe(
          (datos: ModelPerson) => {

            let id_encuesta = String(datos.encuestaId)
          
            this.serviceSurvey.GetSurveyById(id_encuesta).subscribe(
              (datosSurvey: ModelSurvey) => {
                let no_encu = String(datosSurvey.no_encuesta)
                this.router.navigate([`/encuesta/editar-encuesta/${no_encu}`]);

              }
            )
          });
        
      }else if (result.isDismissed) {
        this.servicePerson.GetPeopleById(this.id).subscribe(
          (datos: ModelPerson) => {

            let id_encuesta = String(datos.encuestaId)
          
            this.serviceSurvey.GetSurveyById(id_encuesta).subscribe(
              (datosSurvey: ModelSurvey) => {
                let no_encu = String(datosSurvey.no_encuesta)
                this.router.navigate([`/encuesta/editar-encuesta/${no_encu}`]);

              }
            )
          });
        
      }
    });

  }

}
