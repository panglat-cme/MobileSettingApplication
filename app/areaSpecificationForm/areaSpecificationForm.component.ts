import {Component} from 'angular2/core';
import {ControlGroup, Control} from 'angular2/common';
import {Country} from '../models/country';
import {Category} from '../models/category';

import {CountryService} from '../services/country.service';
import {CategoryService} from '../services/category.service';
import {CommonService} from 'app/common.service';
import {SelectedCategoryList} from 'app/areaSpecificationForm/selectedCategoryList/selectedCategoryList.component';

@Component({
    selector: 'areaSpecificationForm',
    templateUrl: 'app/areaSpecificationForm/areaSpecificationForm.component.html',
    styleUrls: ['app/areaSpecificationForm/areaSpecificationForm.component.css'],
	providers: [CountryService, CategoryService, CommonService, SelectedCategoryList],
    directives: [SelectedCategoryList]
})
export class AreaSpecificationForm {
	countryList : Country[];
    formControlGroup;
	selectedCountryId;
    categories :  Category [];
	myCategoryList : Category [];

	constructor(private countryService: CountryService, private categoryService: CategoryService
		private commonService: CommonService, private selectedCategoryList: SelectedCategoryList) {
		this.selectedCountryId = 2635167;  // United State
		this.countryList = [];
		this.myCategoryList = [];
    }

    ngOnInit(){
        this.formControlGroup = new ControlGroup({
            'radius' : new Control(''),
            'latitude': new Control(''),
            'longitude' : new Control(''),
            'studyId' : new Control ('')
        });
        //this.categories = this.commonService.get();
		// TODO: commonService has to be deleted?
		this.countryService.getCountries()
			.subscribe(
				countryList => this.countryList = countryList,
				error => alert("Country list error: " + error)
				);
				
		this.categoryService.getCategories()
			.subscribe(
				categoryList => this.categories = categoryList,
				error => alert("Category list error: " + error)
				);
    }
    onSubmit(areaSpecification){
        console.log(areaSpecification);
    }

    /**
     * Function used to handle the category checkbox selection event.
     */
    onCategorySelect(category, e){
        if (e.target.checked){
			this.myCategoryList.push(category);
        }
    }

}