import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {Category} from "../models/category";

@Injectable()
export class CategoryService {
	constructor(private _http: Http) { }

	/**
	 * Function used to call the webservice that gets all the
	 * categories
	 * @returns {Observable<R>}
     */
	getCategories() {
		return this._http.get('http://172.17.1.45:8899/MobileSettings/Categories')
		.map((response: Response) => <Category[]>response.json().data)
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
