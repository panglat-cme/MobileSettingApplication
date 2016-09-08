import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {Country} from "../models/country";

@Injectable()
export class CountryService {
	constructor(private _http: Http) { }

	getCountries() {
		return this._http.get('http://172.17.1.45:8899/MobileSettings/Countries')
		.map((response: Response) => <Country[]>response.json().data)
		//.do(data => console.log(data))
		.catch(this.handleError);
	}

	private handleError(error: Response) {
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
