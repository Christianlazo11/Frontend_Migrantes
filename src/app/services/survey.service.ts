import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { ModelIdentify } from '../models/Identify.model';
import { ModelSurvey } from '../models/survey.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  // htttps://api.migrantesarauca2022.com.co
  url="https://api.migrantesarauca2022.com.co";
  token:string="";
  dataUserSession = new BehaviorSubject<ModelIdentify>(new ModelIdentify());


  constructor(
    private http:HttpClient,
    private securityService:SecurityService
  ) {
    this.token=this.securityService.GetToken();
   }
   CreateSurvey(data:ModelSurvey):Observable<ModelSurvey>{
     return this.http.post<ModelSurvey>(`${this.url}/encuestas`,data,{
       headers:new HttpHeaders({
         Authorization: `Bearer ${this.token}`
       })
     })
   }

   UpdateSurvey(data:ModelSurvey):Observable<ModelSurvey>{
     console.log(data)
    return this.http.put<ModelSurvey>(`${this.url}/encuestas/${data.id}`,data,{
      headers:new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }

  DeleteSurvey(id:string):Observable<ModelSurvey>{
    return this.http.delete<ModelSurvey>(`${this.url}/encuestas/${id}`,{
      headers:new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }

  GetSurvey(data:ModelSurvey):Observable<ModelSurvey[]>{
    return this.http.get<ModelSurvey[]>(`${this.url}/encuestas`,{})
  }
  GetSurveyById(id:string):Observable<ModelSurvey>{
    return this.http.get<ModelSurvey>(`${this.url}/encuestas/${id}`,{})
  }
  
  GetData(no_encuesta:number): Observable<ModelSurvey> {
  
    return this.http.get<ModelSurvey>(
      `${this.url}/encuestas?filter={"where":{"no_encuesta":"${no_encuesta}"}}`
      
    );
  }

  ObtenerDatos(noEncuesta:number): Observable<ModelSurvey> {
    return this.http.get<ModelSurvey>( `${this.url}/encuestas?filter={"where":{"no_encuesta":"${noEncuesta}"}}`)
  }

  GetSurveyByMun(mun:string): Observable<ModelSurvey> {
    return this.http.get<ModelSurvey>( `${this.url}/encuestas?filter={"where":{"municipio":"${mun}"}}`)
  }
}
