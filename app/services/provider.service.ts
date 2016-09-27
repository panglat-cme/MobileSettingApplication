import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import {Provider} from "../models/provider";
import {Constants} from "../constants";

@Injectable()
export class ProviderService extends DiyServerService {
	constructor(private _http: Http) { }

    /**
     * Function used to call the webservice to
     * get the list of activity types
     * @returns {Observable<R>}
     */
    getProviders() {
        return this._http.get(Constants.BASE_SERVER_URL + 'Providers')
            .map((response: Response) => <Provider>response.json().data)
			.catch(this.handleResponseError);
    }
}

