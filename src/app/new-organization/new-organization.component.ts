import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IpcService } from '../ipc.service.ts.service';
import { OrganizationInterface } from '../organization-interface';

@Component({
  selector: 'app-new-organization',
  templateUrl: './new-organization.component.html',
  styleUrls: ['./new-organization.component.css']
})
export class NewOrganizationComponent implements OnInit {
  
  organizationName: string = '';
  organizationLocation: string = '';
  organizationMembers: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ipcService: IpcService
  ) { }

  ngOnInit(): void {
  }

  acceptBtn(): void {
    this.organizationName = (<HTMLInputElement>document.getElementById("nameField")).value;
    this.organizationLocation = (<HTMLInputElement>document.getElementById("locationField")).value;
    this.organizationMembers = (<HTMLInputElement>document.getElementById("membersField")).value;

    let newOrganization: OrganizationInterface = {
      name: this.organizationName,
      location: this.organizationLocation,
      members: this.organizationMembers
    }

    this.ipcService.send('organizations/new', newOrganization)
    // this.addCharacter.emit(newChar);

    this.ipcService.on('organizations/created', () => {this.router.navigate(['./..'], {relativeTo: this.route})})
  }

  cancelBtn(): void {
    this.router.navigate(['./..'], {relativeTo: this.route})
  }

}
