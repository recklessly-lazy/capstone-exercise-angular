import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Coach } from "../Coach.model";

@Injectable({
	providedIn: "root",
})
export class CoachprofileService {
	constructor(private http: HttpClient) { }
	viewDetails(id: string): Observable<Coach> {
		console.log("inside viewDetails, id:", id);
		return this.http
			.get<Coach>(`http://localhost:8080/coaches/${id}`)
			.pipe(tap((res) => console.log("inside tap, res:", res)));
	}
}
