import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {SelectedCategory} from 'app/areaSpecificationForm/selectedCategoryList/selectedCategory/selectedCategory.component';

@Component({
    selector: 'selectedCategoryList',
    templateUrl: 'app/areaSpecificationForm/selectedCategoryList/selectedCategoryList.component.html',
    styleUrls: ['app/areaSpecificationForm/selectedCategoryList/selectedCategoryList.component.css'],
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
        this.deleteCategoryList(category);
    }

    /**
     * Function used to delete an item from the categories list
     */
    deleteCategoryList(category){
        var index = this.categoryList.indexOf(category);
        if(index!=-1)
            this.categoryList.splice(index,1);
    }

}