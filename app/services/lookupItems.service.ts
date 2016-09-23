import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {ActivityType} from "../models/activityType";
import {Constants} from "../constants";
import {QuotaType} from "../models/quotaType";
import {TrafficTypes} from "../models/trafficTypes";

//Constants
const LOOKUP_NAME = "lookupName";
const ACTIVITY_TYPE = "Activity_Type";
const QUOTA_TYPE = "Quota_Type";
const TRAFFIC_TYPE = "Traffic_Type";

@Injectable()
export class LookupItemsService extends DiyServerService {

	constructor(private _http: Http) { }
    /**
     * Function used to call the webservice to
     * get the list of activity types
     * @returns {Observable<R>}
     */
    getActivityTypes() {
        return this._http.get(Constants.BASE_SERVER_URL + Constants.LOOKUP_ITEMS + '?' + LOOKUP_NAME + '=' + ACTIVITY_TYPE)
            .map((response: Response) => <ActivityType>response.json().data)
			.catch(this.handleResponseError);
    }

    /**
     * Function used to call the webservice that gets the
     * quotas
     * @returns {Observable<R>}
     */
    getQuotasTypes() {
        return this._http.get(Constants.BASE_SERVER_URL +  Constants.LOOKUP_ITEMS +'?' + LOOKUP_NAME + '=' + QUOTA_TYPE)
            .map((response: Response) => <QuotaType>response.json().data)
            .catch(this.handleResponseError);
    }

    /**
     * Function used to call the webservice that fetches
     * the traffic types.
     * @returns {Observable<R>}
     */
    getTrafficTypes() {
        return this._http.get(Constants.BASE_SERVER_URL +  Constants.LOOKUP_ITEMS + '?' + LOOKUP_NAME + '=' + TRAFFIC_TYPE)
            .map((response: Response) => <TrafficTypes>response.json().data)
            .catch(this.handleResponseError);
    }
}

