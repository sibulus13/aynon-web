// Parses response to extract location name by their type
// return Example:
// {
//     "neighborhood": {
//         "long_name": "Guildford",
//         "short_name": "Guildford"
//     },
//     "political": {
//         "long_name": "Canada",
//         "short_name": "CA"
//     },
//     "locality": {
//         "long_name": "Surrey",
//         "short_name": "Surrey"
//     },
//     "administrative_area_level_2": {
//         "long_name": "Metro Vancouver",
//         "short_name": "Metro Vancouver"
//     },
//     "administrative_area_level_1": {
//         "long_name": "British Columbia",
//         "short_name": "BC"
//     },
//     "country": {
//         "long_name": "Canada",
//         "short_name": "CA"
//     }
// }
export function parseLocationData(data) {
    console.log(data);
    const location_categories = {};
    data.results[0].address_components.forEach(component => {
        const types = component.types;
        types.forEach(type => {
            switch (type) {
                default:
                    let location_info = {
                        long_name: component.long_name,
                        short_name: component.short_name
                    }
                    location_categories[type] = location_info;
            }
        });
    });
    return location_categories;
}