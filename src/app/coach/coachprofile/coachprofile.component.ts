import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Coach } from '../Coach.model';
import { CoachprofileService } from './coachprofile.service';


@Component({
  selector: 'app-coachprofile',
  templateUrl: './coachprofile.component.html',
  styleUrls: ['./coachprofile.component.css']
})
export class CoachprofileComponent implements OnInit {

  id!: string;
  coachDetails!: Coach;
  constructor(private loginService: LoginService, private coachProfileService: CoachprofileService) { }

  ngOnInit(): void {
    this.id = this.loginService.getCoachId();
    console.log("id:", this.id);
    this.coachProfileService.viewDetails(this.id).subscribe({
      next: (coach) => {
        console.log("coach:", coach);
        this.coachDetails = coach
      },
      error: (err) => console.log("err:", err)
    })
  }
  get coach() {
    return this.coachDetails ?? {}
  }
}
