import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { ModelPerson } from "../models/person.model";
import { SecurityService } from "./security.service";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  // url = "https://api.migrantesarauca2022.com.co";
  url = "http://localhost:3000";
  token: String = "";

  constructor(
    private http: HttpClient,
    private serviceSecurity: SecurityService
  ) {
    this.token = this.serviceSecurity.GetToken();
  }

  GetPeople(id: string): Observable<ModelPerson[]> {
    return this.http.get<ModelPerson[]>(
      `${this.url}/personas?filter={"where":{"encuestaId":"${id}"}}`
    );
  }

  GetPeopleById(id: string): Observable<ModelPerson> {
    return this.http.get<ModelPerson>(`${this.url}/personas/${id}`);
  }

  CreatePerson(person: ModelPerson): Observable<ModelPerson> {
    return this.http.post<ModelPerson>(`${this.url}/personas`, person, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  UpdatePerson(person: ModelPerson): Observable<ModelPerson> {
    return this.http.put<ModelPerson>(
      `${this.url}/personas/${person.id}`,
      person,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  DeletePerson(id: string): Observable<any> {
    return this.http.delete(`${this.url}/personas/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
