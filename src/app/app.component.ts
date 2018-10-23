import { Component,Inject,OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DataService } from './data.service';
declare var swal: any;
export interface DialogData {
  title: string;
  last_name: string;
  email:string;
  gender:string;
  mobile:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  id:string;
  title: string;
  last_name: string;
  userData:{};

  constructor(public dialog: MatDialog,private data: DataService) {}

  ngOnInit() {
   
   /* The function below gets the contacts data from the json for the first time */

 	 this.getUsers();
  }
  public getUsers(){
    this.data.getUsers().subscribe((data1:  Array<object>) => {
        this.userData  =  data1;
        this.data.set("userData",this.userData);
    });
  }

  /* The openAddDialog() opens the dialog which allows to add a new contact */

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddContactDialog, {
      width: '450px',
      data: {id:this.id,title: this.title, last_name: this.last_name}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      /* Once the dialog is closed, the function below is called to make sure the data is in sync */

      this.data.changeData(JSON.parse(localStorage.getItem("userData")));
    });
  }
}


@Component({
  selector: 'add-contact-dialog',
  templateUrl: 'add-contact-dialog.html',
})
export class AddContactDialog {

  constructor(
    public dialogRef: MatDialogRef<AddContactDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private dataService: DataService) {}

  public saveContact(contact)
  {
    this.dataService.createContact(contact);
  }

  /* The function below closes the dialog */

  onNoClick(): void {
    this.dialogRef.close();
  }

  /* The saveData function call is triggered from the Dialog UI to save the contact information into the local storage */
  
  saveData(result):void
  {
    /* The for loop below checks to see if any of the fields are empty and if so, shows an error message to the user. */

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
    /* If the validation is successful, then saveContact function is called to save the contact information. */

    this.saveContact(result);
  }

}
