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
    @Input('originalSettings') mobileSettings;
    @Input('selectedCategories') selectedCategories;
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
        this.quotaTypeId = this.mobileSettings.quota_type_id;
    }

    /**
     * Function used to update the quota type id
     * based on the radio buttons selection
     * @param quotaType
     */
    private quotaTypeChanged(quotaType){
        this.quotaTypeId = quotaType.id;
        this.mobileSettings.quota_type_id = quotaType.id;
        if(quotaType.name == Constants.PER_CATEGORY_NAME)
            this.quotaTypePerCategory = true;
        else
            this.quotaTypePerCategory = false;
    }
}