export interface Room {
    id: string;
    name: string;
    type: string;       // e.g., "101"
    price: string;      // e.g., "Singke", "Double", "Suite"
    availability: 'Available' | 'Booked';
}