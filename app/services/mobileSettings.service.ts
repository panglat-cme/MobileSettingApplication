import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service'
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {MobileSettings} from "../models/mobile.settings";

@Injectable()
export class MobileSettingsService extends DiyServerService {
	constructor(private _http: Http) { }

	/**
	 * Function used to get all the mobile settings info
	 * @returns {Observable<R>}
     */
    getMobileSettings() {
        return this._http.get(this.getBaseServerUrl() + 'MobileSetting?id=11')
            .map((response: Response) => <MobileSettings>response.json().data)
			.catch(this.handleResponseError);
    }

	/**
	 * Function used to build the url to the webservice
	 * @param mobileSettings
	 * @returns {string}
     */
	private mobileSettingsToUrlParams(mobileSettings : MobileSettings){
		let searchParams = new URLSearchParams();

		if(mobileSettings.id !== undefined)
			searchParams.set("id",  mobileSettings['id']);

		if(mobileSettings['projectId'] !== "undefined")
			searchParams.set("projectId",  mobileSettings['projectId']);

		if(mobileSettings['proposalId'] !== "undefined")
			searchParams.set("proposalId",  mobileSettings['proposalId']);

		if(mobileSettings['radius'] !== "undefined")
			searchParams.set("radius",  mobileSettings['radius']);

		if(mobileSettings['loiterTime'] !== "undefined")
			searchParams.set("loiterTime",  mobileSettings['loiterTime']);

		if(mobileSettings['minSpeed'] !== "undefined")
			searchParams.set("minSpeed",  mobileSettings['minSpeed']);

		if(mobileSettings['maxSpeed'] !== "undefined")
			searchParams.set("maxSpeed",  mobileSettings['maxSpeed']);

		if(mobileSettings['expirationTime'] !== "undefined")
			searchParams.set("expirationTime",  mobileSettings['expirationTime']);

		if(mobileSettings['currentlyAtLocation'] !== "undefined")
			searchParams.set("currentlyAtLocation",  mobileSettings['currentlyAtLocation']);

		if(mobileSettings['countryId'] !== "undefined")
			searchParams.set("countryId",  mobileSettings['countryId']);

		if(mobileSettings['traffic_type_id'] !== "undefined")
			searchParams.set("trafficTypeId",  mobileSettings['traffic_type_id']);

		if(mobileSettings['activityTypes'] !== "undefined")
			searchParams.set("activityTypes",  mobileSettings['activityTypes']);

		if(mobileSettings['quotaTypeId'] !== "undefined")
			searchParams.set("quotaTypeId",  mobileSettings['quotaTypeId']);

		if(mobileSettings['activityDescription'] !== "undefined")
			searchParams.set("activityDescription",  mobileSettings['activityDescription']);
		
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

		if (mobileSettings.id != undefined){
			return this._http.put(this.getBaseServerUrl() + 'MobileSetting', body, options)
			.map((response: Response) => {
						let id = response.json().data.id;
						return id;
			})
			.catch(this.handleResponseError);
		}
		else{
			return this._http.post(this.getBaseServerUrl() + 'MobileSetting', body, options)
			.map((response: Response) => {
				let id = response.json().data.id;
				return id;
			})
		.catch(this.handleResponseError);
		}
	}
}
