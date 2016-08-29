import {Component} from 'angular2/core';
import {ControlGroup, Control} from 'angular2/common';
import {Country} from '../models/country';
import {Category} from '../models/category';
import {CountryService} from '../services/country.service';
import {CommonService} from 'app/common.service';
import {SelectedCategoryList} from 'app/areaSpecificationForm/selectedCategoryList/selectedCategoryList.component';

@Component({
    selector: 'areaSpecificationForm',
    templateUrl: 'app/areaSpecificationForm/areaSpecificationForm.component.html',
    styleUrls: ['app/areaSpecificationForm/areaSpecificationForm.component.css'],
	providers: [CountryService, CommonService,SelectedCategoryList],
    directives: [SelectedCategoryList]
})
export class AreaSpecificationForm {
	countryList : Country[];
    formControlGroup;
	selectedCountryId;
    categories :  Category [];

	constructor(private _countryService: CountryService, private commonService: CommonService, private selectedCategoryList: SelectedCategoryList) {
		this.selectedCountryId = 2635167;  // United State
		this.countryList = this._countryService.getCountryList();
    }

    ngOnInit(){
        this.formControlGroup = new ControlGroup({
            'radius' : new Control(''),
            'latitude': new Control(''),
            'longitude' : new Control(''),
            'studyId' : new Control ('')
        });
        this.categories = this.commonService.get();
    }
    onSubmit(areaSpecification){
        console.log(areaSpecification);
    }

    /**
     * Function used to handle the category checkbox selection event.
     */
    onCategorySelect(e){
        if (e.target.checked){
            this.selectedCategoryList.addCategoryToList(this.categories[0]);
        }
    }

}