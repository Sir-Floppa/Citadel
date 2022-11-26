import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.css']
})
export class NewCharacterComponent implements OnInit {

  charName: string = '';
  charBirth: string = '';
  charOrigin: string = '';
  charRes: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  acceptBtn(): void {
    this.charName = (<HTMLInputElement>document.getElementById("nameField")).value;
    this.charBirth = (<HTMLInputElement>document.getElementById("birthField")).value;
    this.charOrigin = (<HTMLInputElement>document.getElementById("originField")).value;
    this.charRes = (<HTMLInputElement>document.getElementById("resField")).value;

    console.log("NAME", this.charName);
    console.log("BIRTH", this.charBirth);
    console.log("ORIGIN", this.charOrigin);
    console.log("RESUME", this.charRes);
  }

  cancelBtn(): void {
    this.router.navigate(['./../..'], {relativeTo: this.route})
  }

}
