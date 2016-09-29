import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {MobileSettings} from "../models/mobile.settings";
import {Constants} from "../constants";

@Injectable()
export class MobileSettingsService extends DiyServerService {
	constructor(private _http: Http) { }

	/**
	 * Function used to get all the mobile settings info
	 * @returns {Observable<R>}
     */
    getMobileSettings(id : number) {
        return this._http.get(Constants.BASE_SERVER_URL + Constants.MOBILE_SETTING + '?id=' + id)
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

		if(mobileSettings['project_id'] !== undefined)
			searchParams.set("projectId",  mobileSettings['project_id']);

		if(mobileSettings['proposal_id'] !== undefined)
			searchParams.set("proposalId",  mobileSettings['proposal_id']);

		if(mobileSettings['radius'] !== undefined)
			searchParams.set("radius",  mobileSettings['radius']);

		if(mobileSettings['loiter_time'] !== undefined)
			searchParams.set("loiterTime",  mobileSettings['loiter_time']);

		if(mobileSettings['min_speed'] !== undefined)
			searchParams.set("minSpeed",  mobileSettings['min_speed']);

		if(mobileSettings['max_speed'] !== undefined)
			searchParams.set("maxSpeed",  mobileSettings['max_speed']);

		if(mobileSettings['expiration_time'] !== undefined)
			searchParams.set("expirationTime",  mobileSettings['expiration_time']);

		if(mobileSettings['currently_at_location'] !== undefined)
			searchParams.set("currentlyAtLocation",  mobileSettings['currently_at_location']);

		if(mobileSettings['country_id'] !== undefined)
			searchParams.set("countryId",  mobileSettings['country_id']);

		if(mobileSettings['traffic_type_id'] !== undefined)
			searchParams.set("trafficTypeId",  mobileSettings['traffic_type_id']);

		if(mobileSettings['activity_types'] !== undefined)
			searchParams.set("activityTypes",  mobileSettings['activity_types']);

		if(mobileSettings['quota_type_id'] !== undefined)
			searchParams.set("quotaTypeId",  mobileSettings['quota_type_id']);

		if(mobileSettings['activity_description'] !== undefined)
			searchParams.set("activityDescription",  mobileSettings['activity_description']);
		
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
			return this._http.put(Constants.BASE_SERVER_URL + Constants.MOBILE_SETTING , body, options)
			.map((response: Response) => {
						let id = response.json().data.id;
						return id;
			})
			.catch(this.handleResponseError);
		}
		else{
			return this._http.post(Constants.BASE_SERVER_URL + Constants.MOBILE_SETTING , body, options)
			.map((response: Response) => {
				let id = response.json().data.id;
				return id;
			})
		.catch(this.handleResponseError);
		}
	}
}
