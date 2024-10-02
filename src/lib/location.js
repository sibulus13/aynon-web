import { findLocationId } from '@/lib/supabase';

// Parses response to extract location name by their type
// return Example:
// {
//     "neighborhood": {
//         "long_name": "Guildford",
//         "short_name": "Guildford"
//     },...
//     "country": {
//         "long_name": "Canada",
//         "short_name": "CA"
//     }
// }
export function parseLocationData(data) {
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

// Finds the smallest location type and return its name and id
export async function smallestRegion(data) {
    let smallest = data.results[0].address_components[data.results[0].address_components.length - 1]
    let region = smallest.long_name;
    let res = await findLocationId(smallest.long_name, smallest.types[0])
    // console.log(res);
    if (!res.data || res.data.length === 0) {
        return {
            region: '', region_id: - 1
        };
    }
    let region_id = res.data[0].id;
    return { region, region_id };
}