import { Injectable } from '@angular/core';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private localStorageKey = 'bookings';

  getBookings(): Room[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || `[]`);
  }

  saveBooking(room: Room): void {
    let bookings = this.getBookings();
    bookings.push({ ...room, availability: 'Booked'});
    localStorage.setItem(this.localStorageKey, JSON.stringify(bookings));
  }

  isBooked(roomId: string): boolean {
    return this.getBookings().some(r => r.id === roomId);
  }
}
