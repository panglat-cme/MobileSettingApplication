import {Component} from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import {AreaSpecificationForm} from './areaSpecificationForm/areaSpecificationForm.component';

@Component({
    selector : 'app',
    directives: [AreaSpecificationForm],
    templateUrl : 'app/app.component.html',
    styleUrls : ['app/app.component.css'],
	providers : [HTTP_PROVIDERS]
})
export class AppComponent {
    ngOnInit(){
        //console.log(this.commonService.get());
    }
}