import {Component} from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import {AreaSpecificationForm} from './areaSpecificationForm/areaSpecificationForm.component';
import {CommonService} from './common.service';

@Component({
    selector : 'app',
    directives: [AreaSpecificationForm],
    templateUrl : 'app/app.component.html',
    styleUrls : ['app/app.component.css'],
	providers : [HTTP_PROVIDERS]
})
export class AppComponent {
    constructor(private commonService: CommonService){}

    ngOnInit(){
        //console.log(this.commonService.get());
    }
}