import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IpcService } from '../ipc.service.ts.service';

@Component({
  selector: 'app-new-project-page',
  templateUrl: './new-project-page.component.html',
  styleUrls: ['./new-project-page.component.css']
})
export class NewProjectPageComponent implements OnInit {

  projectPath: string | null;
  
  @ViewChild('nameField', {static: true}) nameField: ElementRef;
  @ViewChild('resField', {static: true}) resField: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private ipcService: IpcService) { 
    this.route.params.subscribe(val => {this.projectPath = val['projectPath']})
  }
  
  ngOnInit(): void {
    
  }

  acceptBtn(): void {
    console.log("NEW PROJECT", this.projectPath);

    let name = this.nameField.nativeElement.value;
    let res = this.resField.nativeElement.value;

    console.log("NAME", name);
    console.log("RESUME", res);
    
    if(name) {
      let data = {
        projectName: name,
        projectResume: res,
        path: this.projectPath,
        file: `${this.projectPath}${name}.ctd`
      }
      this.ipcService.send("projects/create", data);
      this.router.navigate(["projectView", this.projectPath]);
    }
  }

  cancelBtn(): void {
    console.log("PROJECT CANCELLED")
    this.router.navigate(['']);
  }
}
