import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { ModelUser } from "../models/user.model";
import { SecurityService } from "./security.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  url = "http://localhost:3000";
  token: string = "";
  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {
    this.token = this.securityService.GetToken();
  }

  //Aplicamos un filtro para solo obtener los datos de los usuarios que tengan el rol encuestador
  GetData(): Observable<ModelUser[]> {
    return this.http.get<ModelUser[]>(
      `${this.url}/usuarios?filter={"where":{"rol":"encuestador"}}`
    );
  }

  GetDataById(id: string): Observable<ModelUser> {
    return this.http.get<ModelUser>(`${this.url}/usuarios/${id}`);
  }

  CreateUser(user: ModelUser): Observable<ModelUser> {
    return this.http.post<ModelUser>(`${this.url}/usuarios`, user, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  UpdateUser(user: ModelUser): Observable<ModelUser> {
    return this.http.put<ModelUser>(`${this.url}/usuarios/${user.id}`, user, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  DeleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.url}/usuarios/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
