import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {ActivityType} from "../models/activityType";

@Injectable()
export class ActivityTypeService {
    constructor(private _http: Http) { }

    /**
     * Function used to call the webservice to
     * get the list of activity types
     * @returns {Observable<R>}
     */
    getActivityTypes() {
        return this._http.get('http://172.17.1.45:8899/MobileSettings/LookupItems?lookupName=Activity_Type')
            .map((response: Response) => <ActivityType>response.json().data)
            .catch(this.handleError);
    }

    /**
     * Function used to throw errors
     * @param error
     * @returns {ErrorObservable}
     */
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    

}

