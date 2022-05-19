import { Component, OnInit } from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from "@angular/forms";
import { Observable } from "rxjs";
import { Coach } from "src/app/coach/Coach.model";
import { LoginService } from "src/app/login/login.service";
import { User } from "../User.model";
import { UserhomeService } from "./userhome.service";

@Component({
    selector: "app-userhome",
    templateUrl: "./userhome.component.html",
    styleUrls: ["./userhome.component.css"],
})
export class UserhomeComponent implements OnInit {
    coachArray!: Coach[];
    userDetails!: User;
    appointmentDetails!: any;
    appointmentForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userHomeService: UserhomeService,
        private loginService: LoginService
    ) {}

    getAllCoaches(): Observable<Coach[]> {
        return this.userHomeService.allcoaches();
    }
    ngOnInit() {
        this.getAllCoaches().subscribe({
            next: (coaches) => {
                this.coachArray = coaches;
            },
            error: (err) => console.log("err:", err),
        });
        this.appointmentForm = this.fb.group({
            appointmentDate: ["", [Validators.required, dateCalculator]],
            slot: ["", Validators.required],
        });
    }
}

function dateCalculator(fc: FormControl) {}
