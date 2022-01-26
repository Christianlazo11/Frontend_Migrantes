import { Component, OnInit } from '@angular/core';
import { ModelUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent implements OnInit {
  listUsers: ModelUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.GetListUsers();
    console.log(this.listUsers);
  }

  GetListUsers() {
    this.userService.GetData().subscribe((data: ModelUser[]) => {
      this.listUsers = data;
      console.log(data);
    });
  }
}
