import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MobileSettingsService {
	constructor(private _http: Http) { }

	private mobileSettingsToUrlParams(mobileSettings : MobileSettings)
	{
		let searchParams = new URLSearchParams();
        for (let param in mobileSettings) {
			if((typeof mobileSettings[param]) !== "undefined") {
				searchParams.set(param, mobileSettings[param]);
			}
        }
		return searchParams.toString();
	}
	
	createNewMobileSettings(mobileSettings : MobileSettings) {
		let body = this.mobileSettingsToUrlParams(mobileSettings);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ headers: headers });

		return this._http.post('http://intranet.cmeoffshore.com:8899/MobileSettings/MobileSetting', body, options)
		.map((response: Response) => {
			let id = response.json().data.id
			mobileSettings.id = id;
			return mobileSettings;
		})
		//.do(data => console.log(data))
		.catch((response: Response) => this.handleError(response));
	}

	private handleError(error: Response) {
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
