import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {SelectedCategory} from 'app/locationsIdentification/selectedCategoryList/selectedCategory/selectedCategory.component';

@Component({
    selector: 'selectedCategoryList',
    templateUrl: 'app/locationsIdentification/selectedCategoryList/selectedCategoryList.component.html',
    styleUrls: ['app/locationsIdentification/selectedCategoryList/selectedCategoryList.component.css'],
    directives: [SelectedCategory]
})
export class SelectedCategoryList {
	@Input('categoryList') categoryList;
    @Output() remove = new EventEmitter();

    /**
     * Function used to remove a category from the categories
     * object and delete it
     * @param category
     */
    onCategoryDeleted(category){
        this.remove.emit(category);
    }


}