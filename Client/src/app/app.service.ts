import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {
	constructor(private http:Http) {}

	send(sent:any):Observable<any> {
		let url;
		url = "http://localhost:3000/nlp"
		return this.http.post(url,sent).map((res) => res.json());
	}
}