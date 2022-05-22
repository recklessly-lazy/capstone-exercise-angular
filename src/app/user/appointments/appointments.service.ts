import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "src/app/login/login.service";

@Injectable({
    providedIn: "root",
})
export class AppointmentsService {
    constructor(private loginService: LoginService, private http: HttpClient) {}

    appointment(): Observable<any[]> {
        return this.http.get<any>("http://localhost:8080/bookings");
    }
    cancelAppointment(id: any): Observable<any> {
        return this.http.delete<any>(`http://localhost:8080/bookings/${id}`);
    }
}
