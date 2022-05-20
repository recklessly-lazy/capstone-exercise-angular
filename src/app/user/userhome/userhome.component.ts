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
    coachId!: any;
    userDetails!: User;
    id: number = 1;
    appointmentDetails!: any;
    appointmentForm!: FormGroup;
    displayForm!: boolean;
    appointmentConfirmed!: boolean;

    availableSlots: string[] = [
        "9 AM to 10 AM",
        "10 AM to 11 AM",
        "11 AM to 12 PM",
        "2 PM to 3 PM",
        "3 PM to 4 PM",
        "4 PM to 5 PM",
    ];

    constructor(
        private fb: FormBuilder,
        private userHomeService: UserhomeService,
        private loginService: LoginService
    ) {}

    resetForm() {
        this.coachId = null;
        this.appointmentForm.reset();
        // this.appointmentForm.markAsPristine();
        // this.appointmentForm.markAsUntouched();
        // this.appointmentForm.setErrors(null);

        // Object.keys(this.appointmentForm.controls).forEach((key) => {
        //     let item = this.appointmentForm.get(key);
        //     console.log("form control:", item);
        //     this.appointmentForm.get(key)?.setErrors(null);
        // });
    }

    onConfirmAppointMent() {
        let data = this.appointmentForm.value;
        data.userId = this.id;
        data.coachId = this.coachId;
        console.log("form values:", data);
        this.resetForm();
        this.appointmentConfirmed = true;
        this.userHomeService.confirmAppointment(data).subscribe({
            next: (res) => console.log("res:", res),
        });
    }

    getAllCoaches(): Observable<Coach[]> {
        return this.userHomeService.allcoaches();
    }
    ngOnInit() {
        this.id = +this.loginService.getUserId() ?? this.id;
        console.log(`user Id: ${this.id}`);
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

function dateCalculator(fc: FormControl) {
    console.log("control date val:", fc.value);
    let today = new Date();
    let date = fc.value !== null ? new Date(fc.value) : null;
    console.log("date: ", date);
    if (
        date &&
        (date.getDate() - today.getDate() > 7 ||
            date.getDate() - today.getDate() < 0)
    ) {
        return {
            range: "Appointment date should be within the upcoming 7 days",
        };
    } else {
        return null;
    }
}
