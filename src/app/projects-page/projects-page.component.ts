import { Component, OnInit } from '@angular/core';
import { IpcService } from '../ipc.service.ts.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {

  constructor(private ipcService: IpcService) { }
  
  ngOnInit(): void {
  }
  
  newProject(): void {
    this.ipcService.send("projects/new")
  }

  openProject(): void {
    this.ipcService.send("projects/open")
  }

}
