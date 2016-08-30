import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoryService {
	constructor(private _http: Http) { }

	getCategories() {
		return this._http.get('http://intranet.cmeoffshore.com:8899/Settings/Categories'/*'testdata/categories.json'*/)
		.map((response: Response) => <Category[]>response.json().data)
		//.do(data => console.log(data))
		.catch(this.handleError);
	}

	private handleError(error: Response) {
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
