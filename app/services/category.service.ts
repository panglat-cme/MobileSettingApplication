import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {Category} from "../models/category";
import {Constants} from "../constants";

@Injectable()
export class CategoryService extends DiyServerService {
	constructor(private _http: Http) { }

	/**
	 * Function used to call the webservice that gets all the
	 * categories
	 * @returns {Observable<R>}
     */
	getCategories(providers) {
		if(providers !== null && typeof providers === 'object') {
			let query = "";
			for(let i = 0; i < providers.length; i++) {
				let provider = providers[i];
				if(i == 0) {
					query = "" + provider.id
				} else {
					query = query + "," + provider.id;
				}
			}
			
			if(query.length > 0) {
				return this._http.get(Constants.BASE_SERVER_URL + Constants.CATEGORIES +'?providerId=' + query)
				.map((response: Response) => <Category[]>response.json().data)
				//.do(data => console.log(data))
				.catch(this.handleResponseError);
			}
		}
		return new Observable.throw("Invalid data provider");
	}
}
