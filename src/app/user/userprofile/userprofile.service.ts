import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { User } from "../User.model";

@Injectable({
    providedIn: "root",
})
export class UserprofileService {
    viewDetails(id: number): Observable<User> {
        return this.http
            .get<User>(`http://localhost:8080/users/${id}`)
            .pipe(tap((res) => console.log("inside tap, res:", res)));
    }
    constructor(private http: HttpClient) {}
}
