import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private el: ElementRef) {}

  public buttonClick(fragment: string): void {
    this.router.navigateByUrl('#' + fragment);
  }

  ngOnInit(): void {}

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
