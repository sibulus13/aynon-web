export function random_canadian_animal(user) {
    if (user) {
        return user;
    }
    const animals = ['Moose', 'Beaver', 'Polar Bear', 'Goose', 'Loon', 'Bison', 'Grizzly Bear', 'Caribou', 'Arctic Fox', 'Muskox'];
    return animals[Math.floor(Math.random() * animals.length)];
}