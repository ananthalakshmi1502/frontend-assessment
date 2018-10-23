import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userData= [];
  
  /* create a new BehaviorSubject to hold the most updated data which needs to be shared between components after every CRUD operation */

	private userData1 = new BehaviorSubject(JSON.parse(localStorage.getItem("userData")));
  	currentData = this.userData1.asObservable();

  constructor(private http: HttpClient) {
  	this.getUsers().subscribe(data => {
          localStorage.setItem("userData", JSON.stringify(this.userData));
        });
   }

  /* This function below passes in the new updated data to the BehaviorSubject */

   public changeData(data: {}) {

    this.userData1.next(data);
  }

    /**
  * This is the set function to set the key and value in the localStorage
  * @param key,@param data
  * @returns returns a string version of data
  */

   public set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
    return JSON.parse(localStorage.getItem(key));
  }

  /**
  * This is the get function to get value based on the key passed in the localStorage 
  * @param key
  * @returns returns Json form of data
  */

  public get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  /**
  * This is the getUsers function to get the data for the first time from the json file
  * @returns returns Json form of data
  */
  public getUsers(): Observable<any> {

      return this.http.get(("./assets/usersData.json"));

    }

  /**
  * The createContact function to create the contact object and add it to the localStorage
  * @param contact object
  * @returns returns Json form of data
  */

   public createContact(contact){
   	let obj = JSON.parse(localStorage.getItem("userData"));
    if(contact["gender"] == "Male")
    {
      contact["pic"] = "./assets/male_avatar.png";
    }
    else
    {
      contact["pic"] = "./assets/img_avatar2.png";
    }

    const newContact=
      {
          "id": (obj.length+1),
          "title":contact["title"],
          "last_name": contact["last_name"],
          "email": contact["email"],
          "gender": contact["gender"],
          "home_phone": contact["home_phone"],
          "mobile":contact["mobile"],
          "pic":contact["pic"]
        
      };
    this.userData  = JSON.parse(localStorage.getItem("userData"));
    this.userData.push(newContact);
    localStorage.setItem("userData", JSON.stringify(this.userData));
    return JSON.parse(localStorage.getItem("userData"));
	}

  /**
  * The editContact function to edit the contact object and modify it in the localStorage
  * @param contact object
  * @returns returns Json form of data
  */

  public editContact(contact)
  {
    let obj = JSON.parse(localStorage.getItem("userData"));
     obj.forEach(function(user)
     {
        if(user.id == contact.id)
        {
          for(var i in user)
          {
            user[i] = contact[i];
          }
        }
     });
    localStorage.setItem("userData", JSON.stringify(obj));

    return this.http.get(("./assets/usersData.json"));
  }

  /**
  * The removeContact function to remove the contact object from the localStorage
  * @param contact object
  * @returns returns Json form of data
  */

   public removeContact(contact){
    let obj = JSON.parse(localStorage.getItem("userData"));
    var filteredObj = obj.filter(function(user){
      return user.id !== contact.id;
    });
    localStorage.setItem("userData", JSON.stringify(filteredObj));

    return this.http.get(("./assets/usersData.json"));
  }
}
