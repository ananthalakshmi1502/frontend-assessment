import { Component,Inject,OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
declare var swal: any;
export interface DialogData {
  title: string;
  last_name: string;
  email:string;
  gender:string;
  mobile:string;
}
@Component({
  selector: 'app-material-dashboard',
  templateUrl: './material-dashboard.component.html',
  styleUrls: ['./material-dashboard.component.css'],
})
export class MaterialDashboardComponent implements OnInit {
  cards: string;
  rowHeight:string;
  breakpoint:string;
  searchText:string;
  constructor(public dialog: MatDialog,private data: DataService) {}
  ngOnInit() {
    
    /* The condition below is added to adjust the rowHeight of the material grid list for smaller screen sizes */

    if(window.innerWidth <= 990)
    {
      this.rowHeight = "250px";
    }
    else
    {
      this.rowHeight = "200px";

    }

    /* The if condition below is to handle when the page is loaded for the first time. If there exists something in the local storage then use it, else load it from the assets/json file */

    if(this.data.get('userData')!== null)
    {
          this.cards = this.data.get('userData');

    }
    else
    {
        this.data.getUsers().subscribe(data1 => this.cards = data1);

    }
    this.data.currentData.subscribe(cards => this.cards = cards);
  }

  /* This function is to adjust the rowHeight and cols of the material grid list when the user resizes the screen  */ 
  
  onResize(event) {
    if(event.target.innerWidth <= 990)
    {
      this.rowHeight = "250px";
    }
    else
    {
      this.rowHeight = "200px";
    }
  }
  
  /* This function makes a call to the removeContact service defined in the DataService component  */

  public removeContact1(contact)
  {
    this.data.removeContact(contact).subscribe((data1:  Array<object>) => {
          console.log(data1);
      });
  }

  /* This function makes a call to the changeData service defined in the DataService component. This function is used to make sure the data is sync whenever there is any change made to the data stored in the local storage  */

  public changeData1()
  {
    this.data.changeData(JSON.parse(localStorage.getItem("userData")));
  }

  /* The removeContact function is triggered from the dashboard UI whenever the user clicks on the "remove contact". This function takes the contact object as an argument and opens a sweet alert warning popup to confirm that the user is intending to do a delete*/

  removeContact(contact):void
  {
   var that = this;
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function() {
        that.removeContact1(contact);
        that.changeData1();

    });
  }

  /* The editContact function is triggered from the dashboard UI whenever the user clicks on the "edit contact". This function takes the contact object as an argument and  opens the EditContactDialog populating all the contact information. */

  editContact(card): void {
    const dialogRef = this.dialog.open(EditContactDialog, {
      width: '450px',
      data: {card}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      /* The changeData is called to make sure the data is in sync once an operation is performed. */

      this.data.changeData(JSON.parse(localStorage.getItem("userData")));
    });
  }
}

@Component({
  selector: 'edit-contact-dialog',
  templateUrl: '../edit-contact-dialog.html',

})
export class EditContactDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditContactDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private dataService: DataService) {
      this.data = data["card"];
    }
  ngOnInit() {}
  public updateContact(contact)
  {
    this.dataService.editContact(contact).subscribe((data1:  Array<object>) => {
          
      });
  }

  saveData(result):void
  {
    for(var i in result)
      {
        if(i!== "id" && (result[i] == undefined || result[i]==""))
        {
          swal({
            type: 'error',
            title: 'Error',
            text: 'Please input all fields!',
          });
          return;
        }

      }
    this.updateContact(result);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
