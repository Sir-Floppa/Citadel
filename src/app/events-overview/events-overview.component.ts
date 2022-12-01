import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventInterface } from '../event-interface';
import { IpcService } from '../ipc.service.ts.service';

@Component({
  selector: 'app-events-overview',
  templateUrl: './events-overview.component.html',
  styleUrls: ['./events-overview.component.css']
})
export class EventsOverviewComponent implements OnInit {

  events: EventInterface[];

  constructor(
    private ipcService: IpcService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef
  ) { 
    this.ipcService.send('events/load');
      this.ipcService.on('events/send', (event: Object, args: EventInterface[]) => {
        console.log('ARGUMENTS', args);
        this.events = args;
        console.log('EVENTS', this.events);
        this.changeDetection.detectChanges();
    })
  }

  ngOnInit(): void {
  }

  newEvent(): void {
    this.router.navigate(['./newEvent'], {relativeTo: this.route})
  }

}
