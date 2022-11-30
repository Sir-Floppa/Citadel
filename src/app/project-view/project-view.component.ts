import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
  }
  
  // NAVIGATION FUNCTIONS
  goToCharacters(): void {
    this.router.navigate(['./charactersOverview'], {relativeTo: this.route})
  }

  goToOrganizations(): void {
    this.router.navigate(['./organizationsOverview'], {relativeTo: this.route})
  }

  goToEvents(): void {
    this.router.navigate(['./eventsOverview'], {relativeTo: this.route})
  }
}
