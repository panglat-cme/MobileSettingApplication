import {Component} from 'angular2/core';
import {ControlGroup, Control} from 'angular2/common';

@Component({
    selector: 'areaSpecificationForm',
    templateUrl: 'app/areaSpecificationForm/areaSpecificationForm.component.html',
    styleUrls: ['app/areaSpecificationForm/areaSpecificationForm.component.css']
})
export class AreaSpecificationForm {
    formControlGroup;

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