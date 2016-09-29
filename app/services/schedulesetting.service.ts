import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {ScheduleSetting} from "../models/scheduleSetting";
import {Constants} from "../constants";

@Injectable()
export class ScheduleSettingService extends DiyServerService {
	constructor(private _http: Http) { }

    /**
     * Function used to call the webservice to
     * get the list of activity types
     * @returns {Observable<R>}
     */
    getScheduleSetting(projectSettingId) {
        return this._http.get(Constants.BASE_SERVER_URL + 'ScheduleSetting?projectSettingId=' + projectSettingId)
            .map((response: Response) => <ScheduleSetting>response.json().data)
			.catch(this.handleResponseError);
    }

    setScheduleSetting(projectSettingId, scheduleSetting) {
		let searchParams = new URLSearchParams();
		searchParams.set("projectSettingId", projectSettingId);
		searchParams.set("isAnyDayTime", scheduleSetting.anyDayTime == true ? 1 : 0);
        if (scheduleSetting.scheduleSettingList.length != 0)
		searchParams.set("objCount", scheduleSetting.scheduleSettingList.length);

		let scheduleSettingList = scheduleSetting.scheduleSettingList;
		for(let i = 0; i < scheduleSettingList.length; i++) {
			let schedSettingdSetting = scheduleSettingList[i];
			let objNum = i + 1;
			searchParams.set("dayOfWeek" + objNum, schedSettingdSetting.dayOfWeek);
			searchParams.set("fromTime" + objNum, schedSettingdSetting.fromTime);
			searchParams.set("toTime" + objNum, schedSettingdSetting.toTime);
		}
		
		let body = searchParams.toString();
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ headers: headers });

        return this._http.put(Constants.BASE_SERVER_URL + 'ScheduleSetting', body, options)
            .map((response: Response) => true)
			.catch(this.handleResponseError);
    }
}

