import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CounterComponent } from './counter/Counter.Component';

@Component({
  selector: 'app-viewchild',
  templateUrl: './viewchild.component.html',
})
export class ViewchildComponent implements OnInit, AfterViewInit {

  // @ViewChild("highlight")marker:ElementRef;
  @ViewChildren("highlight")marker:QueryList<any>;

  @ViewChild('childView')child:CounterComponent;

  constructor() { 
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    console.log(this.child.counter);
    // console.log(this.marker.length);
    
    this.marker.first.nativeElement.style.color="orange";
    this.marker.last.nativeElement.style.color="green";
  }

  inc(){
     this.child.increment();
  }

  dec() {
    if (this.child.counter > 0) {
        this.child.decrement();
    }
}


}
