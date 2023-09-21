# Google Forms Clone Project (Backend)

## Overview

This repository contains the backend code for a Google Forms clone project. The project aims to replicate the core functionality of Google Forms, allowing users to create forms, share form links, view responses, and submit responses.

## Features

### 1. Form Creation

- Users can create forms with customizable questions and answer choices.
- Support for various question types, including multiple-choice, text, and more.
- Options to add descriptions, youtube video links, and additional instructions to each question.

### 2. Form Sharing

- Generate unique form links that can be shared with respondents.

### 3. Response Management

- View responses in a user-friendly.

### 4. Response Submission

- Provide a user-friendly interface for respondents to fill out forms.
- Implement validation and error handling for form submissions.

## Getting Started

To get started with this project, follow these steps:

   1. Clone the repository: git clone (https://github.com/uvaprasaath/google-form-clone-project.git)
   2. Navigate to the project directory: cd google-form-clone-project/forms-web-server
   3. Install the dependencies: npm i
   4. Build the project : npm run build
   5. Start the server: npm run server
   6. Access the API endpoints through a tool like curl, Postman, or a web browser.
## API Endpoints

**User Registration**
**1. api/auth/signup**
   * METHOD : POST
   * DESCRIPTION : To register new user
   * The Sequence Diagram
     ![signup](https://github.com/uvaprasaath/google-form-clone-project/assets/143567664/6c763bd3-c529-4565-af9f-532f17e8b0dd)

**2. api/auth/login**
   * METHOD : POST
   * DESCRIPTION : To authenticate new user
   * The Sequence Diagram
     ![login](https://github.com/uvaprasaath/google-form-clone-project/assets/143567664/55cdd303-465d-4796-8b05-af220ff7a8ac)

**3. api/auth/token**
   * METHOD : POST
   * DESCRIPTION : To rferesh the access token
   * The Sequence Diagram
     ![toengeneration](https://github.com/uvaprasaath/google-form-clone-project/assets/143567664/505f01c5-2b6b-40ff-8aa9-649357a40bd3)

**Form Creation**

**1. api/form/**
   * METHOD : POST
   * DESCRIPTION : To create a new form
   * The Sequence Diagram
     ![postForm](https://github.com/uvaprasaath/google-form-clone-project/assets/143567664/68c102e0-a2b8-44f0-a42d-78d60bdcbf60)
     
**2. api/form/:id**
   * METHOD : PUT
   * DESCRIPTION : To update a existing form by id 
   * The Sequence Diagram
     
     ![formUpdate](https://github.com/uvaprasaath/google-form-clone-project/assets/143567664/0131d87b-33e8-4c1d-ae34-cf6e5aba8061)

**3. api/form/:id**
   * METHOD : GET
   * DESCRIPTION : To get a existing form by id 
   * The Sequence Diagram
     
     ![getformbyid](https://github.com/uvaprasaath/google-form-clone-project/assets/143567664/95ae8858-e4bd-4a29-8239-1210f15fd66d)

**4. api/form/:id/views**
   * METHOD : PUT
   * DESCRIPTION : update the view count of the form 
   * The Sequence Diagram
     
      ![updateViews](https://github.com/uvaprasaath/google-form-clone-project/assets/143567664/039822ce-38e2-4e80-9e41-d66a57e8f40a)

**5. api/form/response**
   * METHOD : POST
   * DESCRIPTION : add new responses for the form 
   * The Sequence Diagram
     
      ![getPostResponse](https://github.com/uvaprasaath/google-form-clone-project/assets/143567664/be0cc954-614f-4354-a21c-fb636b78ae7a)

**6. api/form/response/:id**
   * METHOD : GET
   * DESCRIPTION : get all responses for the form by id
   * The Sequence Diagram
      ![getResponseforfrombyId](https://github.com/uvaprasaath/google-form-clone-project/assets/143567664/41610e7a-e247-4ae4-bd22-a256c9af226d)

**7. api/form/response/statistics**
   * METHOD : GET
   * DESCRIPTION : get all statistics for the form by user id
   * The Sequence Diagram
      ![getStatistics](https://github.com/uvaprasaath/google-form-clone-project/assets/143567664/9b2c7b18-1b29-402d-86a4-b973ebe62a8c)

**8. api/form/:id**
   * METHOD : DELETE
   * DESCRIPTION : delete the form by form id and also the asociated data
   * The Sequence Diagram

     ![image](https://github.com/uvaprasaath/google-form-clone-project/assets/143567664/f533d31e-b26b-4d08-8d8b-75a0e95e6fa2)

**User Forms**
**1. api/users/forms**
 * METHOD : GET
 * DESCRIPTION : get all the forms by the user id
 * The Sequence Diagram
    
   
![getForms](https://github.com/uvaprasaath/google-form-clone-project/assets/143567664/4705b0e1-5ee2-4f7d-8338-5ab2e0d403de)





      






     


      
