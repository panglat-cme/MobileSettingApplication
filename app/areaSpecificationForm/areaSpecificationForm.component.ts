import {Component} from 'angular2/core';

@Component({
    selector: 'areaSpecificationForm',
    templateUrl: 'app/areaSpecificationForm/areaSpecificationForm.component.html',
    styleUrls: ['app/areaSpecificationForm/areaSpecificationForm.component.css']
})
export class AreaSpecificationForm {

    onSubmit(areaSpecification){
        console.log("test");
    }
}