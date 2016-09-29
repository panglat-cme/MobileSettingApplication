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
    @Input('refineDetails') refineDetails;

    constructor(private lookupItemsService: LookupItemsService){}

    ngOnInit() {
        this.lookupItemsService.getQuotasTypes()
            .subscribe(
                quotaTypes => {
                    this.quotaTypes = quotaTypes;
                    this.quotaTypeChanged(null);
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
        if(quotaType!=null){
            this.quotaTypeId = quotaType.id;
        }
        else{
            var view = this;
            quotaType = this.quotaTypes.filter(function(qt){
                return qt.id == view.quotaTypeId;
            })[0];
        }
        this.mobileSettings.quota_type_id = this.quotaTypeId;

        if(quotaType.name == Constants.PER_CATEGORY_NAME)
            this.quotaTypePerCategory = true;
        else {
            this.quotaTypePerCategory = false;
            this.emptyAllQuotaValue();
        }


    }

    updateRefineDetails(completes,categoryId){
        for(var i=0;i<this.refineDetails.length;i++){
            if(this.refineDetails[i].categoryId ==  categoryId){
                this.refineDetails[i].quota = completes.target.value;
                return;
            }
        }
    }
    getQuotaValue(categoryId){
        for(var i=0;i<this.refineDetails.length;i++){
            if(this.refineDetails[i].categoryId ==  categoryId){
                return this.refineDetails[i].quota;
            }
        }
    }
    updateQuotaTypePerCategoryValue(quotaType){
        this.quotaTypeId = quotaType.id;
        this.mobileSettings.quota_type_id = quotaType.id;
        if(quotaType.name == Constants.PER_CATEGORY_NAME)
            this.quotaTypePerCategory = true;
        else
            this.quotaTypePerCategory = false;
    }
    emptyAllQuotaValue(){
        for(var i=0;i<this.refineDetails.length;i++){
                 this.refineDetails[i].quota="";

        }
    }
}