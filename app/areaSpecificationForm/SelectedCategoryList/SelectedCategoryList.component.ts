import {Component} from 'angular2/core';
import {Category} from "../../models/category";
import {SelectedCategory} from 'app/areaSpecificationForm/selectedCategoryList/selectedCategory/selectedCategory.component';

@Component({
    selector: 'selectedCategoryList',
    templateUrl: 'app/areaSpecificationForm/selectedCategoryList/selectedCategoryList.component.html',
    styleUrls: ['app/areaSpecificationForm/selectedCategoryList/selectedCategoryList.component.css'],
    directives: [SelectedCategory]
})
export class SelectedCategoryList {

    categoryList = [];

    addCategoryToList(category: Category){
        this.categoryList.push(category);
    }
}