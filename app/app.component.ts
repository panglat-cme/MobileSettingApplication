import {Component} from 'angular2/core';
import {AreaSpecificationForm} from './areaSpecificationForm/areaSpecificationForm.component';

@Component({
    selector : 'app',
    directives: [AreaSpecificationForm],
    templateUrl : 'app/app.component.html',
    styleUrls : ['app/app.component.css']

})
export class AppComponent {

}