import { Component, OnInit } from '@angular/core';
import { app } from 'electron';
import { IpcService } from '../ipc.service.ts.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  constructor(private ipcService: IpcService) { }

  ngOnInit(): void {
  }

  closeApp(): void {
    this.ipcService.send("app/close")
  }

  maximizeApp(): void {
    this.ipcService.send("app/maximize")
  }

  hideApp(): void {
    this.ipcService.send("app/hide")
  }

}
