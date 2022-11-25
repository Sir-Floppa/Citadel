import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpcService } from './ipc.service.ts.service';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { FormsModule } from '@angular/forms';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { CharactersOverviewComponent } from './characters-overview/characters-overview.component';
import { OrganizationsOverviewComponent } from './organizations-overview/organizations-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TitleBarComponent,
    NewProjectPageComponent,
    ProjectViewComponent,
    CharactersOverviewComponent,
    OrganizationsOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    IpcService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
