import {Component, Input, Output, EventEmitter} from 'angular2/core';


@Component({
    selector: 'selectedCategory',
    templateUrl: 'app/areaSpecificationForm/selectedCategoryList/selectedCategory/selectedCategory.component.html',
    styleUrls: ['app/areaSpecificationForm/selectedCategoryList/selectedCategory/selectedCategory.component.css']
})
export class SelectedCategory {

    @Input('category') category;
    @Output('deleted') delete = new EventEmitter();
	
    onDelete(e){
        this.delete.emit(this.category);
}}

