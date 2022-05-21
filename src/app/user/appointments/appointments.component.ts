import { Component, OnInit } from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from "@angular/forms";
import { LoginService } from "src/app/login/login.service";
import { AppointmentsService } from "./appointments.service";

@Component({
    selector: "app-appointments",
    templateUrl: "./appointments.component.html",
    styleUrls: ["./appointments.component.css"],
})
export class AppointmentsComponent implements OnInit {
    _userAppointmentsList!: any[];
    userId!: any;
    constructor(
        private loginService: LoginService,
        private appointmentService: AppointmentsService
    ) { }
    get userAppointmentsList() {
        return this._userAppointmentsList ?? {};
    }

    appointment() {
        this.appointmentService.appointment().subscribe({
            next: (res: any[]) => {
                console.log("appointments:", res);
                this._userAppointmentsList = res.filter(
                    (appointment) => appointment.userId == this.userId
                );
            },
        });
    }
    ngOnInit() {
        this.userId = this.loginService.getUserId();
        this.appointment();
    }
}

function dateCalculator(fc: FormControl) {}
