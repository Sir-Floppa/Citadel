import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IpcService } from '../ipc.service.ts.service';

@Component({
  selector: 'app-characters-overview',
  templateUrl: './characters-overview.component.html',
  styleUrls: ['./characters-overview.component.css']
})
export class CharactersOverviewComponent implements OnInit {

  constructor(private ipcService: IpcService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }

  newChar(): void {
    this.ipcService.send('characters/new');
  }

}
