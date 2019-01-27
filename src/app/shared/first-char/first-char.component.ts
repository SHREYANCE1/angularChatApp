import { Component, OnInit, OnChanges, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-first-char',
  templateUrl: './first-char.component.html',
  styleUrls: ['./first-char.component.css']
})
export class FirstCharComponent implements OnInit, OnChanges {

  //to get the changes of the parent component to child component be it design dispaly or calculation
  @Input() name : string;
  @Input() userBg : string;
  @Input() userColor: string;

  public firstChar: string;
  private _name: string ='';

  //to inform the parent component form the child component
  @Output()
  notify: EventEmitter<String> = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
    this._name = this.name;
    this.firstChar = this.name[0];
  } // end ngOnInit

  ngOnChanges(changes: SimpleChanges){
    let name = changes.name;
    this._name = name.currentValue;
    this.firstChar = this.name[0];
  }

  nameClicked(){
    this.notify.emit(this.name)
  }

}
