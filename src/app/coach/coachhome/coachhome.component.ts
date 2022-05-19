import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/login/login.service";
import { Booking } from "./Booking.model";
import { CoachhomeService } from "./coachhome.service";

@Component({
    selector: "app-coachhome",
    templateUrl: "./coachhome.component.html",
    styleUrls: ["./coachhome.component.css"],
})
export class CoachhomeComponent implements OnInit {
    id!: string;
    booking!: Booking;
    constructor(
        private loginService: LoginService,
        private coachHomeService: CoachhomeService
    ) {}
    ngOnInit() {
        this.id = this.loginService.getCoachId();
        this.coachHomeService.schedules().subscribe({
            next: (res: any[]) => {
                console.log("response obj:", res);
                for (let obj of res) {
                  console.log("obj:", obj);
                  console.log(`obj: ${obj.appointmentDate}`);
                }
                this.booking = res.find(
                    (booking) => booking.coachId === this.id
                );
                console.log("res", res);
                console.log(`coach id = ${this.id}`);
            },
        });
    }
}
