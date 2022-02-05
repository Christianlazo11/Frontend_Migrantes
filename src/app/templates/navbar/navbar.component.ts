import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModelIdentify } from 'src/app/models/Identify.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  isAdmin: string = '';

  subs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private el: ElementRef,
    private securityService: SecurityService
  ) {}

  public buttonClick(fragment: string): void {
    this.router.navigateByUrl('#' + fragment);
  }

  ngOnInit(): void {
    this.subs = this.securityService
      .GetDataUserSession()
      .subscribe((data: ModelIdentify) => {
        this.isLogin = data.isLog;
        if (data.datos?.rol === 'administrador') {
          this.isAdmin = 'administrador';
          console.log(data.datos.rol);
        }
      });

    console.log(this.isLogin);
  }

  responsiveNav() {
    let menu = this.el.nativeElement.querySelector('#menu-btn');
    let navbar = this.el.nativeElement.querySelector('.header .navbar');
    if (menu.classList.value === 'fa fa-bars') {
      console.log('entro');
      menu.classList.remove('fa-bars');
      menu.classList.add('fa-times');
    } else if (menu.classList.value === 'fa fa-times') {
      menu.classList.remove('fa-times');
      menu.classList.add('fa-bars');
    }
    navbar.classList.toggle('active');
  }
}
