import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../login/login.service";
import { UserprofileService } from "./userprofile.service";
import constants from "../../../assets/constant";
import { User } from "../User.model";

@Component({
    selector: "app-userprofile",
    templateUrl: "./userprofile.component.html",
    styleUrls: ["./userprofile.component.css"],
})
export class UserprofileComponent implements OnInit {
    constructor(
        private loginService: LoginService,
        private userProfileService: UserprofileService
    ) {}
    userId: any = 2;
    userDetails!: User;

    get user() {
        return this.userDetails ?? {};
    }
    ngOnInit(): void {
        this.userId = this.loginService.getUserId() ?? this.userId;
        this.userProfileService.viewDetails(this.userId).subscribe({
            next: (res) => {
                console.log("response:", res);
                this.userDetails = res;
            },
        });
    }
}
