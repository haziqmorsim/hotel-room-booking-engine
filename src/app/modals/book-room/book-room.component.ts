import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-book-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.scss'
})
export class BookRoomComponent implements OnInit {
  @Input() room!: Room;
  @Output() booked = new EventEmitter<{ room: Room, guestName: string }>();
  bookingForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.bookingForm = this.fb.group({
        guestName: ['', Validators.required],
        checkIn: ['', Validators.required],
        checkOut: ['', Validators.required],
      });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      this.booked.emit({ 
        room: this.room,
        guestName: this.bookingForm.value.guestName,
      });
    }
  }
}
