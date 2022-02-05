import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelSurvey } from '../models/survey.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  url="http://localhost:3000";
  token:string="";


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
  GetSurveyByNoSurvey(no_encuesta:string):Observable<ModelSurvey>{
    return this.http.get<ModelSurvey>(`${this.url}/encuestas/${no_encuesta}`,{})
  }
}
