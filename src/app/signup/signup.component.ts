import { animate, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SignupService } from "./signup.service";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.css"],
    animations: [
        trigger("formEntry", [
            transition(":enter", [
                style({ height: 0, width: 0, opacity: 0 }),
                animate(
                    "1s ease",
                    style({ height: "*", width: "*", opacity: 1 })
                ),
            ]),
        ]),
    ],
    providers: [SignupService],
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

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private signupService: SignupService
    ) {}

    directLogin() {
        this.router.navigate(["/login", this.role]);
    }

    userRegister() {
        this.signupService.register(this.userregisterForm.value).subscribe({
            next: (res) => {
                console.log(`res: ${res}`);
                this.userId = res.id;
                this.formDisplay = false;
            },
        });
    }

    coachRegister() {
        this.signupService.register(this.coachregisterForm.value).subscribe({
            next: (res) => {
                console.log(`res: ${res}`);
                this.coachId = res.id;
                this.formDisplay = false;
            },
        });
    }

    initCoachRegistrationForm() {
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
                    // Validators.required,
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

    initUserRegistrationForm() {
        this.userregisterForm = this.fb.group({
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
                    // Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(10),
                ],
            ],
            dateOfBirth: ["", ageCalculator],
            gender: ["", Validators.required],
            email: ["", [Validators.required, validateEmail]],
            pincode: ["", validatePin],
            city: ["", [Validators.minLength(6), Validators.maxLength(20)]],
            state: ["", [Validators.minLength(6), Validators.maxLength(20)]],
            country: ["", [Validators.minLength(6), Validators.maxLength(20)]],
        });
    }
    ngOnInit() {
        this.role = this.route.snapshot.paramMap.get("role");
        if (this.role === "coaches") {
            this.initCoachRegistrationForm();
        } else if (this.role === "users") {
            this.initUserRegistrationForm();
        }
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

function validatePin(control: FormControl) {
    let pincode: string = control ? control.value.toString() : "";
    if (pincode.length === 6) {
        return null;
    } else {
        return { pincode: "Pincode should have exactly 6 digits" };
    }
}

function validateEmail(control: FormControl) {
    let email: string = control ? control.value : "";
    console.log(`email: ${email}`);
    let pattern: RegExp = /^[a-zA-Z_0-9]+@[a-zA-Z0-9]+\.([a-zA-Z]{2,3})/;
    if (email.match(pattern) || email === "") {
        return null;
    } else {
        return { email: "Enter a valid email address" };
    }
}
