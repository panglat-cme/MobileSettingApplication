import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {Country} from "../models/country";
import {Constants} from "../constants";

@Injectable()
export class CountryService extends DiyServerService {
	constructor(private _http: Http) { }

	/**
	 * Function used to call the webservice that fetches all the countries
	 * @returns {Observable<R>}
     */
	getCountries() {
		return this._http.get(Constants.BASE_SERVER_URL + Constants.COUNTRIES)
		.map((response: Response) => <Country[]>response.json().data)
		//.do(data => console.log(data))
		.catch(this.handleResponseError);
	}
}
