import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service'
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {MobileSettings} from "../models/mobile.settings";

@Injectable()
export class MobileSettingsService {
	constructor(private _http: Http, private diyServerService : DiyServerService) { }

	/**
	 * Function used to get all the mobile settings info
	 * @returns {Observable<R>}
     */
    getMobileSettings() {
        return this._http.get(this.diyServerService.getBaseServerUrl() + 'MobileSetting?id=8')
            .map((response: Response) => <MobileSettings>response.json().data)
			.catch(this.diyServerService.handleResponseError);
    }

	/**
	 * Function used to build the url to the webservice
	 * @param mobileSettings
	 * @returns {string}
     */
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

	/**
	 * Function used to save the mobile settings
	 * @param mobileSettings
	 * @returns {Observable<R>}
     */
	createNewMobileSettings(mobileSettings : MobileSettings) {
		let body = this.mobileSettingsToUrlParams(mobileSettings);
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ headers: headers });

		if (mobileSettings.id != "undefined"){
			return this._http.put(this.diyServerService.getBaseServerUrl() + 'MobileSetting', body, options)
			.map((response: Response) => {
						let id = response.json().data.id;
						return id;
			})
			.catch(this.diyServerService.handleResponseError);
		}
		else{
			return this._http.post(this.diyServerService.getBaseServerUrl() + 'MobileSetting', body, options)
			.map((response: Response) => {
				let id = response.json().data.id;
				return id;
			})
		.catch(this.diyServerService.handleResponseError);
		}
	}
}
