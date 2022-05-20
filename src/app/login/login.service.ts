import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class LoginService {
    userId!: string;
    coachId!: string;
    currentRole!: string | null;

    constructor(private http: HttpClient, private router: Router) {}

    isUserLoggedIn() {
        let route = this.router;
        console.log("route obj: ", route);
        console.log(
            "userid:",
            this.userId,
            " coachId:",
            this.coachId,
            " current role:",
            this.currentRole
        );
        // return this.userId !== null || this.coachId !== null;
        if (
            (this.userId != null && this.currentRole == "users") ||
            (this.coachId != null && this.currentRole == "coaches")
        )
            return true;
        return false;
    }
    getCoachId() {
        return this.coachId;
    }
    getUserId() {
        return this.userId;
    }

    login(role: string | null, id: string): Observable<any> {
        console.log("inside login function of login service, role = ", role);
        console.log(`id: ${id}`);
        return this.http.get<any>(`http://localhost:8080/${role}/${id}`).pipe(
            tap({
                next: (res) => {
                    console.log(`inside tap: ${JSON.stringify(res)}`);
                    if (role === "coaches") {
                        this.coachId = res.id;
                    } else if (role === "users") {
                        this.userId = res.id;
                    }
                    this.currentRole = role;
                },
                error: (err) => console.log("err", err),
            })
        );
    }
}
