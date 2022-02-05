import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModelIdentify } from '../models/Identify.model';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  url = 'http://localhost:3000';
  dataUserSession = new BehaviorSubject<ModelIdentify>(new ModelIdentify());
  constructor(private http: HttpClient) {
    this.CheckCurrentSession();
  }

  CheckCurrentSession() {
    let data = this.GetDataSession();
    if (data) {
      this.UpdateDataSession(data);
    }
  }

  UpdateDataSession(data: ModelIdentify) {
    this.dataUserSession.next(data);
  }
  GetDataUserSession() {
    return this.dataUserSession.asObservable();
  }

  //obtenemos datos si el usuario es correcto
  IdentifyUser(user: string, password: string): Observable<ModelIdentify> {
    return this.http.post<ModelIdentify>(
      `${this.url}/identificarUsuario`,
      {
        usuario: user,
        clave: password,
      },
      {
        headers: new HttpHeaders({}),
      }
    );
  }
  //Guardamos los datos de la sesion en el local storage
  SaveSession(data: ModelIdentify) {
    data.isLog = true;
    let stringData = JSON.stringify(data);
    localStorage.setItem('dataSession', stringData);
    this.UpdateDataSession(data);
  }

  //obtenemos los datos del local storage cada vez que los necesitamos
  GetDataSession() {
    let stringData = localStorage.getItem('dataSession');
    if (stringData) {
      let data = JSON.parse(stringData);
      return data;
    } else {
      return null;
    }
  }

  //este metodo eliminara los datos almacenados en el local storage, en caso que se le de cerrar sesion
  DeleteDataSession() {
    localStorage.removeItem('dataSession');
    this.UpdateDataSession(new ModelIdentify());
  }

  //Con este metodo sabremos si se ha iniciado sesion o no
  IsLogin() {
    let dataSession = localStorage.getItem('dataSession');
    return dataSession;
  }

  GetToken() {
    let dataSession = localStorage.getItem('dataSession');
    if (dataSession) {
      let data = JSON.parse(dataSession);
      return data.tk;
    } else {
      return '';
    }
  }

  GelRol() {
    let dataSession = localStorage.getItem('dataSession');
    if (dataSession) {
      let data = JSON.parse(dataSession);
      return data.datos.rol;
    } else {
      return '';
    }
  }
}
