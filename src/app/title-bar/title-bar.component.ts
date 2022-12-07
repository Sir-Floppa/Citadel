import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IpcService } from '../ipc.service.ts.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  constructor(
    private ipcService: IpcService,
    private router: Router,
    private route: ActivatedRoute) { }
  title = "Citadel"

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

  goToMain(): void {
    this.router.navigate(['/'])
  }

}
