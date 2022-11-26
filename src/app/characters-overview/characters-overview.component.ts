import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IpcService } from '../ipc.service.ts.service';

@Component({
  selector: 'app-characters-overview',
  templateUrl: './characters-overview.component.html',
  styleUrls: ['./characters-overview.component.css']
})
export class CharactersOverviewComponent implements OnInit {

  constructor(
    private ipcService: IpcService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  newChar(): void {
    this.router.navigate(["./charView/1"], {relativeTo: this.route});
  }

}
