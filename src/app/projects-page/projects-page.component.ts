import { Component, OnInit } from '@angular/core';
import { IpcService } from '../ipc.service.ts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {

  constructor(private ipcService: IpcService, private router: Router) { }
  
  ngOnInit(): void {
  }
  
  newProject(): void {
    this.ipcService.send("projects/new");
    this.ipcService.on('projects/createNew', (event: Object, data: string) => { this.router.navigate(['newProject', data]) });
  }

  openProject(): void {
    this.ipcService.send("projects/open")
    this.ipcService.on("projects/load", (event: Object, data: string) => { 
      let path = data.split('\\');
      path.pop();
      let jointPath = path.join('/');
      console.log("PATH", path);
      console.log("JOINT PATH", jointPath);
      this.router.navigate(['projectView', jointPath])
    })
  }
}
