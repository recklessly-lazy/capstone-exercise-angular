import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Coach } from "src/app/coach/Coach.model";

@Injectable({
    providedIn: "root",
})
export class UserhomeService {
    confirmAppointment(data: Object): Observable<any> {
        return this.http
            .post<any>("http://localhost:8080/bookings", data)
            .pipe(tap((res) => console.log("res:", res)));
    }
    allcoaches(): Observable<Coach[]> {
        return this.http
            .get<Coach[]>("http://localhost:8080/coaches")
            .pipe(tap((res) => console.log("inside tap, res:", res)));
    }
    constructor(private http: HttpClient) {}
}
