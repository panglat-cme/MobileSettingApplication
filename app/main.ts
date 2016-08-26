import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {CommonService} from './common.service';
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(AppComponent, [
    CommonService,
    HTTP_PROVIDERS
]);