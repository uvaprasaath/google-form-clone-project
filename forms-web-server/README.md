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


      
