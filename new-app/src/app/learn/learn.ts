import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './learn.html',
  styleUrl: './learn.css'
})
export class Learn { }
