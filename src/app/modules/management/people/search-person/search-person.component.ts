import { Component, OnInit } from "@angular/core";
import { ModelPerson } from "src/app/models/person.model";
import { PersonService } from "src/app/services/person.service";

@Component({
  selector: "app-search-person",
  templateUrl: "./search-person.component.html",
  styleUrls: ["./search-person.component.css"],
})
export class SearchPersonComponent implements OnInit {
  listPeople: ModelPerson[] = [];
  constructor(private servicePerson: PersonService) {}
  ngOnInit(): void {
    this.GetListPeople();
  }

  GetListPeople() {
    this.servicePerson.GetPeople().subscribe((datos: ModelPerson[]) => {
      this.listPeople = datos;
    });
  }
}
