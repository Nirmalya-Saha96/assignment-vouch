# assignment-vouch

**Execution details**

- cd <project directory>
- npm install
- npm start
- Note the server will start at localhost:5000
  
# POSTMAN TESTING
  
**For Authentication and getting JWT-token**
  
- POST -> localhost:5000/api/authenticate -> 
  
  passing -> as json to body
  {
    "email": "nirmalya.saha201@gmail.com",
    "password": "123456"
  }
- OUTPUT RETURN -> JWT-token [copy for further purpose]
- Note the email and password should be given same
  
**Add a new contact**

 - POST -> localhost:5000/api/contact 
  passing as a json to body [SAMPLE] ->
   {
    "name": "name",
    "phone_no": "phone number"
  }
  passing as headers ->
  x-auth-token : JWT-token received from localhost:5000/api/authenticate
  
  **Add bulk contacts.**
  
  - POST -> localhost:5000/api/contact/addBulkContact
    passing as a json to body [SAMPLE] ->
  [
    {
        "name": "name2",
        "phone_no": "9674240884"
    },
    {
        "name": "name3",
        "phone_no": "9674240885"
    }
]
  passing as headers ->
  x-auth-token : JWT-token received from localhost:5000/api/authenticate
  
  **Fetch details of single contact.**
  
  - GET -> localhost:5000/api/contact/{id}
  [note id should be contact object id of mongodb]
  passing as headers ->
  x-auth-token : <JWT-token>
  
  **Fetch phase matching results.**
  
  - POST -> localhost:5000/api/contact/phase/match
    passing as a json to body [SAMPLE] ->
  {
    "name": "name3"
  }
  passing as headers ->
 x-auth-token : JWT-token received from localhost:5000/api/authenticate
  
  
  **Fetch the list of contacts with pagination.**
  
  - GET -> localhost:5000/api/contact/pagination/user?pageNo=1&size=10
  [note you can customise the query]
  passing as headers ->
x-auth-token : JWT-token received from localhost:5000/api/authenticate
  
  **Update the given contact.**
  
  - POST -> localhost:5000/api/contact/update/{id}
  [note id should be contact object id of mongodb]
     passing as a json to body [SAMPLE] ->
  {
    "name": "updated_name",
    "phone_no": "1234567890"
}
  passing as headers ->
x-auth-token : JWT-token received from localhost:5000/api/authenticate
  
  
  **Delete the given contact.**
  
  - DELETE -> localhost:5000/api/contact/delete/{id}
  [note id should be contact object id of mongodb]
   passing as headers ->
  x-auth-token : JWT-token received from localhost:5000/api/authenticate
  
  
  
# TECH STACK
  - nodejs
  - mongodb
  - expressjs
  - express validator
  - JWT-token
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
