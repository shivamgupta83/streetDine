
                                                       Clone project in your local pc.

#step 1 - 
RUN 

npm i

#step 2 - 

open terminal run

npm run start

[then u will see server is running :port--3000]

#step 3 -

See routes 

Step 4-

Run Apis

1=  TO CREATE USER 

POST
localhost:3000/createUser

REQ BODY - {
    "name":"testUser",
    "email":"test@gmail.com",
    "password":"123456"
}

RESPONCE - {
    "status": true,
    "message": "user is created",
    "data": {
        "name": "testUser",
        "email": "test@gmail.com",
        "password": "123456",
        "isDeleted": false,
        "_id": "65ad74613cb1678814be7c7d",
        "__v": 0
    }
}

2= TO LOGIN USER 
POST
localhost:3000/loginUser

REQ - {
    "email":"test@gmail.com",
    "password":"123456"
}

RESPONCE BODY - 

{
    "status": true,
    "message": "Logined...............! Lets Enjoy",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFkNzQ0YjNjYjE2Nzg4MTRiZTdjN2IiLCJpYXQiOjE3MDU4NjY1MDF9.diMNb8lMjDrGEXA541lkkp6KddtTcU8MWHgpfOSe4G4"
}


3 = Now CREATE ITEMS 
POST
localhost:3000/auth/createProduct

Paste into postman 

curl --location 'localhost:3000/auth/createProduct' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFkMWM4NjJlNGRhMDQ3NzQ0MDk4YzgiLCJpYXQiOjE3MDU4NDQyNTB9.n4JNIl5JMXoW2Vecv0n9KCIlgi29ihh_7bvWeVvZt_M' \
--form 'title="tex3"' \
--form 'description="test1"' \
--form 'price="100"'

 
 OR

 give token in header 

'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFkMWM4NjJlNGRhMDQ3NzQ0MDk4YzgiLCJpYXQiOjE3MDU4NDQyNTB9

AND REQUEST BODY -{"title": "tex3",
        "description": "test1",
        "price": 100,}



RESPONCE- {
    "status": true,
    "message": "product created sucessfully",
    "data": {
        "title": "tex3",
        "description": "test1",
        "price": 100,
        "isDeleted": false,
        "_id": "65ad6bf3374e49132076894a",
        "createdAt": "2024-01-21T19:09:39.690Z",
        "updatedAt": "2024-01-21T19:09:39.690Z",
        "__v": 0
    }
}


3= UPDATE PRODUCT
POST

curl --location 'localhost:3000/auth/updateItem/65ad6bf3374e49132076894a' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFkNmJiMTM3NGU0OTEzMjA3Njg5NDUiLCJpYXQiOjE3MDU4NjQxMjZ9.THTptPTvMWq9SR5x0qA__4trYU8OHLb6yyMNIpHQbNU' \
--header 'Content-Type: application/json' \
--data '{
    "title": "tex3",
        "description": "test4",
        "price": 200

}'


OUTPUT -

{
    "status": true,
    "message": "success",
    "updateData": {
        "_id": "65ad6bf3374e49132076894a",
        "title": "tex3",
        "description": "test4",
        "price": 200,
        "isDeleted": false,
        "createdAt": "2024-01-21T19:09:39.690Z",
        "updatedAt": "2024-01-21T19:15:19.403Z",
        "__v": 0
    }
}

4= DELETE PRODUCT
DELETE
localhost:3000/auth/deleteItem/645c7b7581d503b786c86ee2

curl --location --request DELETE 'localhost:3000/auth/deleteItem/645c7b7581d503b786c86ee2' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFkMWM4NjJlNGRhMDQ3NzQ0MDk4YzgiLCJpYXQiOjE3MDU4NDQyNTB9.n4JNIl5JMXoW2Vecv0n9KCIlgi29ihh_7bvWeVvZt_M'


RESPONCE -{ status: true, message: 'successfully DELETED'}


5= CREATE ORDER 
POST
localhost:3000/auth/createOrder

curl --location 'localhost:3000/auth/createOrder' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFkMWM4NjJlNGRhMDQ3NzQ0MDk4YzgiLCJpYXQiOjE3MDU4NDQyNTB9.n4JNIl5JMXoW2Vecv0n9KCIlgi29ihh_7bvWeVvZt_M' \
--header 'Content-Type: application/json' \
--data '{
"userId":"65ad6bb1374e491320768945",
"orderItems":[{
    "id":"65ad6bf3374e49132076894a",
    "qty":8
},
{
    "id":"65ad5d5edba0d7b3dc031547",
    "qty":3
}
]
}'


RESPONSE BODY-{
    "status": true,
    "message": {
        "userId": "65ad6bb1374e491320768945",
        "orderItems": [
            {
                "id": "65ad6bf3374e49132076894a",
                "qty": 8
            }
        ],
        "_id": "65ad6edebb7e5c3c42405f5b",
        "createdAt": "2024-01-21T19:22:06.781Z",
        "updatedAt": "2024-01-21T19:22:06.781Z",
        "__v": 0
    }
}

5 - UPDATE ORDER
POST
localhost:3000/auth/updateOrder

curl --location 'localhost:3000/auth/updateOrder' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFkMWM4NjJlNGRhMDQ3NzQ0MDk4YzgiLCJpYXQiOjE3MDU4NDQyNTB9.n4JNIl5JMXoW2Vecv0n9KCIlgi29ihh_7bvWeVvZt_M' \
--header 'Content-Type: application/json' \
--data '{
"userId":"65ad6bb1374e491320768945",
"orderItems":[{
    "id":"65ad6bf3374e49132076894a",
    "qty":4
},
{
    "id":"65ad5d5edba0d7b3dc031547",
    "qty":3
}
]
}'

RESPONCE BODY -{
    "status": true,
    "message": {
        "_id": "65ad6edebb7e5c3c42405f5b",
        "userId": "65ad6bb1374e491320768945",
        "orderItems": [
            {
                "id": "65ad6bf3374e49132076894a",
                "qty": 4
            },
            null
        ],
        "createdAt": "2024-01-21T19:22:06.781Z",
        "updatedAt": "2024-01-21T19:22:49.785Z",
        "__v": 0
    }
}


LAST 6 PAYMENT - 
POST
localhost:3000/payment


curl --location 'localhost:3000/payment' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFkMWM4NjJlNGRhMDQ3NzQ0MDk4YzgiLCJpYXQiOjE3MDU4NDQyNTB9.n4JNIl5JMXoW2Vecv0n9KCIlgi29ihh_7bvWeVvZt_M' \
--header 'Content-Type: application/json' \
--data '{
    "userId":"65ad6bb1374e491320768945",
    "paying":800
}'

RESPONCE BODY-

IF ERROR
{
    "message": "please pay same : 0"
}

IF SUCCESS 

{
    "message": "THANKS FOR PAYMENT"
}


<!-- -------------------------------------------------------------------------------------------- -->


some points 

*many things are not fully clear that why i maked both auth and non auth apis also added vercel code if deploy need 
*we can use bcrypt for password encryption
*we can also use express-validator for validate our request
*some logic was not clear in doc so i make logic by mine so please go see all logic that give u understanding.


------------------------------------------------------------------------THANKS--------------------------------------

GIVE PROPER FEEDBACK IT TAKE TIME AND EFFORTS

CODER - SHIVAM GUPTA
MOBILE NO - 8359083814