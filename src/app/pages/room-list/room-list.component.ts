import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomCardComponent } from "../../components/room-card/room-card.component";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  standalone: true,
  styleUrl: './room-list.component.scss',
  imports: [CommonModule, FormsModule, RoomCardComponent]
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  selectedType: string = '';
  toastMessage = '';
  showToast = false;
  searchQuery = '';

  constructor(private roomService: RoomService, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(data => {
      const bookedRooms = this.bookingService.getBookings();
      this.rooms = data.map(room => ({
        ...room,
        availability: this.bookingService.isBooked(room.id) ? 'Booked' : 'Available'
      }));
      this.filteredRooms = [...this.rooms];
    });
  }

  filterByType(): void {
    this.filteredRooms = this.selectedType ? this.rooms.filter(r => r.type === this.selectedType) : this.rooms;
  }

  openBookModal(room: Room): void {
    this.showBookingToast(`Room ${room.name} is booked successfully!`)
  }

  showBookingToast(message: string): void {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  filterRooms(): void {
    this.filteredRooms = this.rooms.filter(room =>
      room.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (!this.selectedType || room.type === this.selectedType)
    );
  }
}
