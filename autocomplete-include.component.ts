import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-autocomplete-include',
  templateUrl: './autocomplete-include.component.html',
  styleUrls: ['./autocomplete-include.component.scss']
})
export class AutocompleteIncludeComponent implements OnDestroy {

  constructor() { }

  @Output() onchange:EventEmitter<Object> = new EventEmitter<Object>(); // emmits when something gets clicked
  @Input('arr') public arr:Array<any>; // the list to be filtered
  @Input('lookIn') private lookIn:string|Array<string>; // keywords to match against in the list
  @Input('title') public title:string; // the display title

  public list:Array<any> = null;
  public active = false;
  public acModel:string;
  public activeHover = 0;

  public change():void {
    if (!this.arr || !Array.isArray(this.arr) || !this.lookIn || this.lookIn === '') return;
    if (this.acModel == '') {
      this.list = null;
      this.onchange.emit(null);
      return;
    }
    let searchFor = this.acModel.toLowerCase();
    this.list = this.arr.filter(row => {
      if (typeof this.lookIn == 'string') 
      {
        if ((row[this.lookIn] && row[this.lookIn].toLowerCase().indexOf(searchFor) !== -1)) {
          return row;
        }
      }
      else if (Array.isArray(this.lookIn)) 
      {
        for (const [key, val] of this.lookIn.entries()) {
          if (row[val] && row[val].toLowerCase().indexOf(searchFor) !== -1) {
            return row;
          }
        }
      }
    });
  }

  public show():void {
    this.active = true;
    this.bindListeners();
    setTimeout(() => {
      let autocomplete = document.getElementById('autocomplete');
      let dimmer = document.getElementById('autocompleteDimmer');
      let body = document.getElementsByTagName('body')[0];
      let input = document.getElementById('autocompleteInput');
      new Promise(resolve => {
        if (autocomplete && dimmer && body) {
          resolve();
        }
      }).then(() => {
        body.append(autocomplete);
        body.append(dimmer);
      });
      setTimeout(() => {
          input.focus();
      }, 100);
    });
  }

  public hide():void {
    this.list = null;
    this.active = false;
    this.activeHover = 0;
    this.unbindListeners();
  }

  public toggle():void {
    if (this.active) {
      this.hide();
    } else {
      this.show();
    }
  }

  public assign(obj:any):void {
    this.onchange.emit(obj);
    this.hide();
  }

  public reset():void {
    this.acModel = null;
    this.onchange.emit(null);
    this.hide();
  }

  private bindListeners():void {
    document.addEventListener('keyup', this.keyup);
  }

  private unbindListeners():void {
    document.removeEventListener('keyup', this.keyup);
  }

  public keyup = (e:KeyboardEvent):void => {
    if (!this.active) return;
    let keyCode = e.keyCode || e.which || false;
    let code = e.code || e.key || false;

    if (keyCode == 27 || code == 'Escape' || code == 'Esc') {
      this.reset();
    } 
    else if (keyCode == 40 || code == 'ArrowDown') 
    {
      this.activeHover++;
    } 
    else if (keyCode == 38 || code == 'ArrowUp') 
    {
      this.activeHover--;
    } 
    else if (keyCode == 13 || code == 'Enter' || code == 'NumpadEnter') 
    {
      if (e.srcElement['id'] == 'autocompleteInput' && this.active) {
        e.preventDefault();
        if (this.activeHover == 0) {
          this.assign(this.list ? this.list[0] : this.arr[0]);
        } else {
          this.assign(this.list ? this.list[this.activeHover] : this.arr[this.activeHover]);
        }
      }
    }
  }

  ngOnDestroy() {
    this.hide();
    this.unbindListeners();
  }

}
