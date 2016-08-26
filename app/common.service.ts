export class CommonService {

    locationCategories = [
        {categoryName : "Stores"}
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