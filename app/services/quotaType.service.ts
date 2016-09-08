import { Injectable } from 'angular2/core';
import { DiyServerService } from '../services/diyServer.service'
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import { QuotaType } from "../models/quotaType";

@Injectable()
export class QuotaTypeService extends DiyServerService {
	constructor(private _http: Http) { }

    getQuotasTypes() {
        return this._http.get(this.getBaseServerUrl() + 'LookupItems?lookupName=Quota_Type')
            .map((response: Response) => <QuotaType>response.json().data)
			.catch(this.handleResponseError);
    }
}

