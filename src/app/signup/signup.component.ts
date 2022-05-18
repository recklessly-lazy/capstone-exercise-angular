import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
    role!: string | null;
    signUpTitle!: string;
    signUpImg!: string;
    formDisplay = true;
    errorMessage = "";
    userregisterForm!: FormGroup;
    coachregisterForm!: FormGroup;
    userId: any;
    coachId: any;

    constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

    ngOnInit() {
        this.role = this.route.snapshot.paramMap.get("role");

        this.coachregisterForm = this.fb.group({
            name: [
                "",
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50),
                ],
            ],
            password: [
                "",
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(10),
                ],
            ],
            mobileNumber: [
                "",
                [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(10),
                ],
            ],
            dateOfBirth: ["", ageCalculator],
            gender: ["", Validators.required],
            speciality: [
                "",
                [Validators.minLength(10), Validators.maxLength(50)],
            ],
        });
    }
}

function ageCalculator(fc: FormControl) {
    console.log(`fc: ${JSON.stringify(fc.value)}`);
    let dobStr = fc.value;
    let dateOfBirth = new Date(dobStr);
    let today = new Date();
    let message = "Age should be between 20 and 100 years";
    let age = today.getFullYear() - dateOfBirth.getFullYear();

    let mob = dateOfBirth.getMonth();
    console.log(`age: ${age}`);
    if (
        mob < today.getMonth() ||
        (mob === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
        --age;
    }
    return age < 20 || age > 100 ? { dateOfBirth: message } : null;
}
