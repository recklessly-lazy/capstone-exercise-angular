import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/login/login.service";
import { CoachhomeService } from "./coachhome.service";

@Component({
    selector: "app-coachhome",
    templateUrl: "./coachhome.component.html",
    styleUrls: ["./coachhome.component.css"],
})
export class CoachhomeComponent implements OnInit {
    id!: string;
    constructor(
        private loginService: LoginService,
        private coachHomeService: CoachhomeService
    ) {}
    ngOnInit() {
        this.id = this.loginService.getCoachId();
        this.coachHomeService.schedules().subscribe({
            next: (res) => {
                console.log("res", res);
                console.log(`coach id = ${this.id}`);
            },
        });
    }
}
