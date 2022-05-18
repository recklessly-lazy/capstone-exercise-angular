import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SignupService {
    url: string = "http://localhost:8080/";
    constructor(private http: HttpClient, private route: ActivatedRoute) {
        let currRoute = route.snapshot.paramMap.get("role");
        this.url += currRoute === "users" ? "users" : "coaches";
    }

    register(data: any): Observable<any> {
        console.log(`data: ${JSON.stringify(data)}`);
        console.log(`url: ${this.url}`);
        return this.http
            .post(this.url, data)
            .pipe(tap((res) => console.log(`res: ${JSON.stringify(res)}`)))
    }
}
