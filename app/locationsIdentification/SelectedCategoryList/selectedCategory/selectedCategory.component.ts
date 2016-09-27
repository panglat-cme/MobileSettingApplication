import {Component, Input, Output, EventEmitter} from 'angular2/core';


@Component({
    selector: 'selectedCategory',
    templateUrl: 'app/locationsIdentification/SelectedCategoryList/selectedCategory/selectedCategory.component.html',
    styleUrls: ['app/locationsIdentification/SelectedCategoryList/selectedCategory/selectedCategory.component.css']
})
export class SelectedCategory {

    @Input('category') category;
    @Output('deleted') delete = new EventEmitter();

    /**
     * Function used to handle the click of the delete button of the
     * category under the categories grid
     * @param e
     */
    onDelete(e){
        e.preventDefault();
        this.delete.emit(this.category);
}}

