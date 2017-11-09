import Config from 'config';

export function bindFormData(object, images) {
    var formData = new FormData();
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var val = object[key];
            if (val != undefined) {
                if(typeof val ==='object'){
                    val = JSON.stringify(val)
                }
                formData.append(key, val)
            }
        }
    }
    if(!!images){
        images.forEach(function (file, key) {
            formData.append('file' + key, file)
        }, this);
    }
    return formData;
}


export function addImagesUrl(data) {
    if (Array.isArray(data)) {
        data.map((item) => {
            if(item.picUrl){
                item.picUrl = Config.staticServer + item.picUrl
            }
        })
    }

    return data;
}
