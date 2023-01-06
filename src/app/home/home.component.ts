import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogPopUpComponent } from '../dialog-pop-up/dialog-pop-up.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(DialogPopUpComponent , {
      width: '70%',
      maxWidth: '90%',
      height:'auto'
  });

  }

  
}
