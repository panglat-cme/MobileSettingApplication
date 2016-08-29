import {Category} from "./models/category";

export class CommonService {
    locationCategories: Category[];

    locationCategories = [
        {name : "Stores"},

        {
            name: "Coffee Shops"
        },
       
    ];
    
    get() {
        return this.locationCategories;
    }

    // add(mediaItem) {
    //     this.locationCategories.push(mediaItem);
    // }
    //
    // delete(mediaItem) {
    //     var index = this.locationCategories.indexOf(mediaItem);
    //     if (index >= 0) {
    //         this.locationCategories.splice(index, 1);
    //     }
    // }


}