import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IpcService } from '../ipc.service.ts.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ipcService: IpcService
  ) { }

  ngOnInit(): void {
  }
  
  acceptBtn(): void {

  }

  cancelBtn(): void {
    this.router.navigate(['./..'], {relativeTo: this.route})
  }

}
