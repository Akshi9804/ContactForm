import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GuviContactForm';

  //initializing response and error data variables
  responseData: any;
  error: any=null;

  //form submission
  onSubmit(event: Event) {
    event.preventDefault(); 

    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const contactInput = document.getElementById('contact') as HTMLInputElement;
    const subInput = document.getElementById('subject') as HTMLInputElement;
    const messageInput = document.getElementById('message') as HTMLInputElement;

    const postData = {
    name: nameInput.value,  
    email: emailInput.value,
    contact: contactInput.value,
    subject: subInput.value,
    message: messageInput.value
    };
    
    //POST using fetch
    fetch('https://6718446ab910c6a6e02b7fc7.mockapi.io/guvi-contact-form-api/guvi-contact-form-data', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
    .then((response) => {
      if (!response.ok) {
        console.log("error");
        this.error="Error in sending data"
      }
      return response.json(); 
    })
    .then((data) => {
      this.responseData = data;
      console.log('Response Data:', this.responseData); 
    })
    .catch((error) => {
      console.error('Error:', error);
      this.error = 'Request Failed'; 
    });



  }
}
