import { Component, HostListener, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

total_encuestas: number=900;
encuestas_Arauca: number=475;
encuestas_Arauquita: number=200;
encuestas_Saravena: number=225;

  @HostListener('window:beforeunload')
  onUnLoad(){
    const data = new FormData();
    alert("Desea salir de la aplicacion?")

    data.append('name', 'abc');
    data.append('location', 'world');
    
    let conf = navigator.sendBeacon('http://www.mysitioweb.com/api/v1/endpoint', data);
    if(conf){
      this.serviceSecurity.DeleteDataSession();

    }
    else{
      
    }
    return false;

  }
  constructor(
    private serviceSecurity: SecurityService,

  ) {}

  ngOnInit(): void {}
}
