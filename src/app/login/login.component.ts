import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Route, Router } from "@angular/router";
import { LoginService } from "./login.service";
import constants from "../../assets/constant";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    role!: string | null;
    loginTitle!: string;
    loginImg!: string;
    loginForm!: FormGroup;
    placeholder!: string;
    errorMessage!: string;

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    goToUserOrCoachHome() {
        if (this.role === "users") this.router.navigate(["user"]);
        else this.router.navigate(["coach"]);
    }
    login() {
        this.loginService
            .login(this.role, this.loginForm.value["id"])
            .subscribe({
                next: (res) => {
                    console.log(`res: ${JSON.stringify(res)}`);
                    console.log(
                        `login form: ${JSON.stringify(this.loginForm.value)}`
                    );
                    if (res.password === this.loginForm.value.password) {
                        this.goToUserOrCoachHome();
                    }
                    if (res.password !== this.loginForm.value.password) {
                        this.errorMessage = "Invalid credentials bhaiyya !";
                    }
                },
                error: (err) => {
                    console.log(`err: ${JSON.stringify(err)}`);

                    this.errorMessage =
                        err.status === 404
                            ? "Id doesn't exist"
                            : "Something went wrong";
                },
            });
    }

    ngOnInit() {
        this.role = this.route.snapshot.paramMap.get("role");
        this.loginForm = this.fb.group({
            id: ["", Validators.required],
            password: [
                "",
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(10),
                ],
            ],
        });
    }
}
