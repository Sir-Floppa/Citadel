import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersOverviewComponent } from './characters-overview/characters-overview.component';
import { EventsOverviewComponent } from './events-overview/events-overview.component';
import { NewCharacterComponent } from './new-character/new-character.component';
import { NewEventComponent } from './new-event/new-event.component';
import { NewOrganizationComponent } from './new-organization/new-organization.component';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';
import { OrganizationsOverviewComponent } from './organizations-overview/organizations-overview.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';

const routes: Routes = [
  {path: '', component: ProjectsPageComponent, pathMatch: 'full'},
  {path: 'newProject/:projectPath', component: NewProjectPageComponent},
  {path: 'projectView/:projectPath', component: ProjectViewComponent,
    children: [
      {path: 'charactersOverview', component: CharactersOverviewComponent,
        children: [
          {path: 'newChar', component: NewCharacterComponent},
        ]},
      {path: 'organizationsOverview', component: OrganizationsOverviewComponent,
        children: [
          {path: 'newOrganization', component: NewOrganizationComponent}
        ]},
      {path: 'eventsOverview', component: EventsOverviewComponent,
        children: [
          {path: 'newEvent', component: NewEventComponent}
        ]},
      {path: '', redirectTo: 'charactersOverview', pathMatch: 'full'}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  ProjectsPageComponent,
  NewProjectPageComponent,
  ProjectViewComponent
]
