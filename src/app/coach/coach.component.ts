import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { LoginService } from "../login/login.service";

@Component({
    selector: "app-coach",
    templateUrl: "./coach.component.html",
    styleUrls: ["./coach.component.css"],
    providers: [LoginService],
    // encapsulation: ViewEncapsulation.None,
})
export class CoachComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
