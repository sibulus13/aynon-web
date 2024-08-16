export const canadianAnimals = ['Moose', 'Beaver', 'Polar Bear', 'Goose', 'Loon', 'Bison', 'Grizzly Bear', 'Caribou', 'Arctic Fox', 'Muskox'];
 

export function random_canadian_animal(user) {
    if (user) {
        return user;
    }

    return canadianAnimals[Math.floor(Math.random() * canadianAnimals.length)];
}