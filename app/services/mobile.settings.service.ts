import { Injectable } from 'angular2/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {MobileSettings} from "../models/mobile.settings";

@Injectable()
export class MobileSettingsService {
	constructor(private _http: Http) { }

    getMobileSettings() {
        return this._http.get('http://172.17.1.45:8899/MobileSettings/MobileSetting?id=8')
            .map((response: Response) => <MobileSettings>response.json().data)
            .catch(this.handleError);
    }

	private mobileSettingsToUrlParams(mobileSettings : MobileSettings)
	{
		let searchParams = new URLSearchParams();

		if(mobileSettings['id'] !== "undefined")
			searchParams.set("id",  mobileSettings['id']);


		if(mobileSettings['traffic_type_id'] !== "undefined")
			searchParams.set("trafficType",  mobileSettings['traffic_type_id']);

		if(mobileSettings['activityTypes'] !== "undefined")
			searchParams.set("activityTypes",  mobileSettings['activityTypes']);


		return searchParams.toString();
	}
	
	createNewMobileSettings(mobileSettings : MobileSettings) {
		let body = this.mobileSettingsToUrlParams(mobileSettings);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ headers: headers });

		if (mobileSettings.id != "undefined"){
			return this._http.put('http://172.17.1.45:8899/MobileSettings/MobileSetting', body, options)
		.map((response: Response) => {
					let id = response.json().data.id;
					return id;
		})
		.catch((response: Response) => this.handleError(response));
	}
		else{
		return this._http.post('http://172.17.1.45:8899/MobileSettings/MobileSetting', body, options)
		.map((response: Response) => {
			let id = response.json().data.id;
			return id;
		})
		.catch((response: Response) => this.handleError(response));
	}
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
