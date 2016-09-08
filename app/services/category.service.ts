import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service'
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {Category} from "../models/category";

@Injectable()
export class CategoryService extends DiyServerService {
	constructor(private _http: Http) { }

	/**
	 * Function used to call the webservice that gets all the
	 * categories
	 * @returns {Observable<R>}
     */
	getCategories() {
		return this._http.get(this.getBaseServerUrl() + 'Categories')
		.map((response: Response) => <Category[]>response.json().data)
		//.do(data => console.log(data))
		.catch(this.handleResponseError);
	}
}
