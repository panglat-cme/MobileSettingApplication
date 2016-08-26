import {Component} from 'angular2/core';
import {AreaSpecificationForm} from './areaSpecificationForm/areaSpecificationForm.component';
import {CommonService} from './common.service';

@Component({
    selector : 'app',
    directives: [AreaSpecificationForm],
    templateUrl : 'app/app.component.html',
    styleUrls : ['app/app.component.css']

})
export class AppComponent {
    constructor(private commonService: CommonService){}

    ngOnInit(){
        console.log(this.commonService.get());
    }

    proposalId = 45678;
    projectId = 156465;
}