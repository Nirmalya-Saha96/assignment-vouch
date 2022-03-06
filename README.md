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
  passing as a json to body ->
  {
    "name": "<name>",
    "phone_no": "<phone number>"
  }
  passing as headers ->
  x-auth-token : <JWT-token>
  
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
  x-auth-token : <JWT-token>
  
  **Fetch details of single contact.**
  
  - POST -> 
  
  
  
  
  
  
  
  
  
  
