import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-do-survey',
  templateUrl: './do-survey.component.html',
  styleUrls: ['./do-survey.component.css'],
})
export class DoSurveyComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/seguridad/identificar']);
  }
}
