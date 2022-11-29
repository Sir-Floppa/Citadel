import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterInterface } from '../character-interface';
import { IpcService } from '../ipc.service.ts.service';

@Component({
  selector: 'app-characters-overview',
  templateUrl: './characters-overview.component.html',
  styleUrls: ['./characters-overview.component.css']
})
export class CharactersOverviewComponent implements OnInit {

  characters: CharacterInterface[];

  constructor(
    private ipcService: IpcService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetection: ChangeDetectorRef) { 
      this.ipcService.send('characters/load');
      this.ipcService.on('characters/send', (event: Object, args: CharacterInterface[]) => {
        console.log('ARGUMENTS', args);
        this.characters = args;
        console.log('CHARACTERS', this.characters);
        this.changeDetection.detectChanges();
      })
    }
    
  ngOnInit(): void {
  }

  newChar(): void {
    this.router.navigate(["./newChar"], {relativeTo: this.route});
  }

  addCharacter(char: any): void {
    console.log("ACTUALIZADO");
    this.characters.push(char);
    this.changeDetection.detectChanges();
  }

}
