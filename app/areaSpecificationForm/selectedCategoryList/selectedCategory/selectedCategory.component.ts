import {Component, Input} from 'angular2/core';


@Component({
    selector: 'selectedCategory',
    templateUrl: 'app/areaSpecificationForm/selectedCategoryList/selectedCategory/selectedCategory.component.html',
    styleUrls: ['app/areaSpecificationForm/selectedCategoryList/selectedCategory/selectedCategory.component.css']
})
export class SelectedCategory {

    @Input('category') category;

}