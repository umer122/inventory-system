import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CRUD';
  listData: any = [];
  arrayIndex: any=[];
  toggleDisplay :boolean=true;
  HideShow:boolean=false
  minDate = new Date();
  data: any = [];
  maxDate=new Date("03/01/2020")

  toggle(){
    this.HideShow=!this.HideShow
  }
  inventoryForm = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.email]),
    price: new FormControl(null,[Validators.required, Validators.pattern("^[0-9]*$")]),
    quantity: new FormControl(null,[Validators.required]),
    date: new FormControl(null,[Validators.required,]),
  });
 
  
  updateName(item:any, key:any) {
    this.arrayIndex = key;
    // alert(key)

    this.toggleDisplay = !this.HideShow
    this.inventoryForm.patchValue({
      name:item.name,
      price:item.price,
      quantity:item.quantity,
      date:item.date,
    })
  }
  
  getValue(value: any) {
    this.data = value;
    if (this.toggleDisplay==true) { 
      this.listData.push((this.data));
      this.inventoryForm.reset();
    }
    
    else if (this.toggleDisplay==false){
      this.listData[this.arrayIndex]=this.data;
      this.inventoryForm.reset();      
    }
    localStorage.setItem("MenuItem",JSON.stringify(this.listData))
  }
  index: any = [];
  deleteItem(data: any) {
    this.index = this.listData.indexOf(data);
    if (this.index !== -1) {
      this.listData.splice(this.index, 1);
    }
  }
  ngOnInit(){
    this.listData =JSON.parse(localStorage.getItem('MenuItem') || '{}')
  }


}
