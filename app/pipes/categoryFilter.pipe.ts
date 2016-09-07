import {Injectable, Pipe, PipeTransform} from 'angular2/core';
import {Category} from '../models/category';

@Pipe({
	name: 'categoryFilter'
})

@Injectable()
export class CategoryFilterPipe implements PipeTransformPipeTransform {
    transform(value: any, args: string[]): any {
       let filter = args[0].toLocaleLowerCase();
       return (filter && value) ? value.filter(category => category.name.toLocaleLowerCase().indexOf(filter) != -1) : value;
    }
}