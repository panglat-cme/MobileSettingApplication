import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CountryService {
	constructor(private _http: Http) { }

	getCountries() {
		return this._http.get('testdata/countries.json')
		.map((response: Response) => <Country[]>response.json().data)
		.do(data => console.log(data))
		.catch(this.handleError);
	}

	private handleError(error: Response) {
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
