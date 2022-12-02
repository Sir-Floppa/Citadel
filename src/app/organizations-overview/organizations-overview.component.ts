import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IpcService } from '../ipc.service.ts.service';
import { OrganizationInterface } from '../organization-interface';

@Component({
  selector: 'app-organizations-overview',
  templateUrl: './organizations-overview.component.html',
  styleUrls: ['./organizations-overview.component.css']
})
export class OrganizationsOverviewComponent implements OnInit {

  organizations: OrganizationInterface[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef,
    private ipcService: IpcService
  ) { 
    this.ipcService.send('organizations/load');
      this.ipcService.on('organizations/send', (event: Object, args: OrganizationInterface[]) => {
        console.log('ARGUMENTS', args);
        this.organizations = args;
        console.log('ORGANIZATIONS', this.organizations);
        this.changeDetection.detectChanges();
    })
  }

  ngOnInit(): void {
  }

  newOrganization(): void {
    this.router.navigate(['./newOrganization'], {relativeTo: this.route})
  }
}
