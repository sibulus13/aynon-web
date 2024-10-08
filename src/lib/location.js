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

// Checks if the location is within Canada
export function withinCanada(data) {
    for (let i = 0; i < data.results[0].address_components.length; i++) {
        let component = data.results[0].address_components[i];
        if (component.types.includes('country') && component.long_name === 'Canada') {
            return true;
        }
    }
    return false;
}

// Finds the smallest location type and return its name and id
export async function smallestRegion(data) {
    let smallest = data.results[0].address_components[data.results[0].address_components.length - 1]
    let region = smallest.long_name;
    let res = await findLocationId(smallest.long_name, smallest.types[0])
    if (!res.data || res.data.length === 0) {
        return {
            region: '', region_id: - 1
        };
    }
    let region_id = res.data[0].id;
    return { region, region_id };
}