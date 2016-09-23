import { Injectable } from 'angular2/core';
import { Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DiyServerService {

	/**
	 * Function used to throw errors
	 * @param error
	 * @returns {ErrorObservable}
     */
	handleResponseError(error: Response) {
		let e = error.json();
		if(e.hasOwnProperty("data") && e.data instanceof Array && e.data.length > 0 && e.data[0].hasOwnProperty("message")) {
			let msg = e.data[0].message;
			if (e.data[0].hasOwnProperty("code")) {
				msg = "(" + e.data[0].code + ") " + msg;
			}
			return Observable.throw(msg);
		} else {
			return Observable.throw('Server error');
		}
	}
}