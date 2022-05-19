import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class LoginService {
    userId!: string;
    coachId!: string;

    getCoachId() {
        return this.coachId;
    }

    login(role: string | null, id: string): Observable<any> {
        console.log(`id: ${id}`);
        return this.http.get<any>(`http://localhost:8080/${role}/${id}`).pipe(
            tap({
                next: (res) => {
                    console.log(`inside tap: ${JSON.stringify(res)}`);
                    role === "coaches"
                        ? (this.coachId = res.id)
                        : (this.userId = res.id);
                },
                error: (err) => console.log("err", err),
            })
        );
    }

    constructor(private http: HttpClient) {}
}
