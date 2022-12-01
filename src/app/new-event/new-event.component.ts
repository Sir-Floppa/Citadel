import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventInterface } from '../event-interface';
import { IpcService } from '../ipc.service.ts.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  eventName: string = '';
  eventBegin: string = '';
  eventFinish: string = '';
  eventResume: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ipcService: IpcService
  ) { }

  ngOnInit(): void {
  }
  
  acceptBtn(): void {
    this.eventName = (<HTMLInputElement>document.getElementById("nameField")).value;
    this.eventBegin = (<HTMLInputElement>document.getElementById("beginField")).value;
    this.eventFinish = (<HTMLInputElement>document.getElementById("finishField")).value;
    this.eventResume = (<HTMLInputElement>document.getElementById("resField")).value;

    console.log("NAME", this.eventName);
    console.log("BEGIN", this.eventBegin);
    console.log("FINISH", this.eventFinish);
    console.log("RESUME", this.eventResume);

    let newEvent: EventInterface = {
      name: this.eventName, 
      begin: this.eventBegin, 
      finish: this.eventFinish, 
      resume: this.eventResume
    }

    this.ipcService.send('events/new', newEvent)
    // this.addCharacter.emit(newChar);

    this.ipcService.on('events/created', () => {this.router.navigate(['./..'], {relativeTo: this.route})})
  }

  cancelBtn(): void {
    this.router.navigate(['./..'], {relativeTo: this.route})
  }

}
