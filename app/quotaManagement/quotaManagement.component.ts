import {Component, Input} from "angular2/core";
import {Constants} from "../constants";
import {LookupItemsService} from "../services/lookupItems.service";
import {QuotaType} from "../models/quotaType";


@Component({
    selector: 'quotaManagement',
    templateUrl: 'app/quotaManagement/quotaManagement.component.html',
    styleUrls: ['app/quotaManagement/quotaManagement.component.css'],
    providers: [LookupItemsService]
})

export class QuotaManagement{
    quotaTypes:QuotaType[];
    quotaTypeId = 0;
    quotaTypePerCategory = false;

    constructor(private lookupItemsService: LookupItemsService){}

    ngOnInit() {
        this.lookupItemsService.getQuotasTypes()
            .subscribe(
                quotaTypes => {
                    this.quotaTypes = quotaTypes;
                },
                error => {
                    alert(Constants.ERROR_RETRIEVING_LIST + "Quota Types.");
                }
            );
    }

}