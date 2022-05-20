import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[LoginService]
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
