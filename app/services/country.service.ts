import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {Country} from "../models/country";

@Injectable()
export class CountryService {
	constructor(private _http: Http) { }

	/**
	 * Function used to call the webservice that fetches all the countries
	 * @returns {Observable<R>}
     */
	getCountries() {
		return this._http.get('http://172.17.1.45:8899/MobileSettings/Countries')
		.map((response: Response) => <Country[]>response.json().data)
		//.do(data => console.log(data))
		.catch(this.handleError);
	}

	/**
	 * Function used to throw errors
	 * @param error
	 * @returns {ErrorObservable}
     */
	private handleError(error: Response) {
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
