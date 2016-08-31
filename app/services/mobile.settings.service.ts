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
		//return "activityDescription=This is my 5&radius=1100&proposalId=108&projectId=1456&loiterTime=11&minSpeed=21&maxSpeed=110&expirationTime=14&currentlyAtLocation=true&activityTypes=2,3,5";
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
		alert("handleError=" + JSON.stringify(error))
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
