import { Component } from '@angular/core';
import {AppService} from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [AppService]
})
export class AppComponent {
 
sent:any ={};
data : any=[];
constructor(private service:AppService) {}
send() {
	this.service.send(this.sent)
	.subscribe((para) => {
		this.data = para;
		console.log(this.data);
	})
}
}
