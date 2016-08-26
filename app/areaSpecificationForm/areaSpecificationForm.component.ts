import {Component} from 'angular2/core';
import {ControlGroup, Control} from 'angular2/common';
import {Country} from '../models/country';
import {CountryService} from '../services/country.service';

@Component({
    selector: 'areaSpecificationForm',
    templateUrl: 'app/areaSpecificationForm/areaSpecificationForm.component.html',
    styleUrls: ['app/areaSpecificationForm/areaSpecificationForm.component.css']
	providers: [CountryService]
})
export class AreaSpecificationForm {
	countryList : Country[];
    formControlGroup;
	selectedCountryId;
	
	constructor(private _countryService: CountryService) {
		this.selectedCountryId = 2635167;  // United State
		this.countryList = this._countryService.getCountryList();
	}

    categories = [
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Restaurants"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        },
        {
            categoryName: "Coffee Shops"
        }



    ];

    ngOnInit(){
        this.formControlGroup = new ControlGroup({
            'radius' : new Control(''),
            'latitude': new Control(''),
            'longitude' : new Control(''),
            'studyId' : new Control ('')
        });
    }
    onSubmit(areaSpecification){

        console.log(areaSpecification);
    }

}