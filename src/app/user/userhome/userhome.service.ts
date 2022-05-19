import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Coach } from "src/app/coach/Coach.model";

@Injectable({
    providedIn: "root",
})
export class UserhomeService {
    allcoaches(): Observable<Coach[]> {
        return this.http
            .get<Coach[]>("http://localhost:8080/coaches")
            .pipe(tap((res) => console.log("inside tap, res:", res)));
    }
    constructor(private http: HttpClient) {}
}
