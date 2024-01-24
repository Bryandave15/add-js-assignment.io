//MVC - model, view, controller design pattern
const express = require("express");
const app = express();
const cors = require("cors")


app.use(express.urlencoded({ extended:true })) //for form submission
app.use(express.json()) //json response
app.use(
    cors(
        { origin : "http://localhost:3000" }  //front end
    )
)


// PARA SA register
const inspectionDB = [];

app.post('/add-inspection', (req, res) => {
    let activityName = req.body.activityName;
    let inspectionCode  = req.body.inspectionCode;
    let description = req.body.description;
    let trade = req.body.trade;
    let inspectionDate = req.body.inspectionDate;
    let location = req.body.location;
    let contractor = req.body.contractor;
    let inspector = req.body.inspector;
    let dateClosed = req.body.dateClosed;
    let file1 = req.body.file1;

    idCount = inspectionDB.length + 1;
    const newRecord = {
        id: idCount,
        activityName: activityName,
        inspectionCode: inspectionCode,
        description: description,
        trade: trade,
        inspectionDate: inspectionDate,
        location: location,
        contractor: contractor,
        inspector: inspector,
        dateClosed: dateClosed,
        file1: file1,
    }

    const saveStatus = inspectionDB.push(newRecord);
    if (saveStatus) {
        res.status(200).json(
            { code: "success", msg: "Inspection Added", regInspection: inspectionDB }
        );
    } else {
        res.status(400).json(
            { code: "failed", msg: "Something is wrong" }
        );
    }
});


//add profile
const newProfile = [];

app.post('/new-profile', (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let adress = req.body.adress;
    let email = req.body.email;

    profileId = newProfile.length + 1;
    const newProfileRecord = {
        profileId: profileId,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        adress: adress,
        email: email,
    }

    const newStatus = newProfile.push(newProfileRecord);
    if (newStatus) {
        res.status(200).json(
            { code: "success", msg: "profile registration successful", regNewProfile: newProfile }
        );
    } else {
        res.status(400).json(
            { code: "failed", msg: "profile registration error in saving" }
        );
    }
});


// PARA SA register
const addProfile = [];

app.post('/add-profile', (req, res) => {
    let activityName = req.body.activityName;
    let inspectionCode  = req.body.inspectionCode;
    let description = req.body.description;
    let trade = req.body.trade;
    let inspectionDate = req.body.inspectionDate;
    let location = req.body.location;
    let contractor = req.body.contractor;
    let inspector = req.body.inspector;
    let dateClosed = req.body.dateClosed;
    let file1 = req.body.file1;

    idCount = inspectionDB.length + 1;
    const newRecord = {
        id: idCount,
        activityName: activityName,
        inspectionCode: inspectionCode,
        description: description,
        trade: trade,
        inspectionDate: inspectionDate,
        location: location,
        contractor: contractor,
        inspector: inspector,
        dateClosed: dateClosed,
        file1: file1,
    }

    const saveStatus = inspectionDB.push(newRecord);
    if (saveStatus) {
        res.status(200).json(
            { code: "success", msg: "Inspection Added", regInspection: inspectionDB }
        );
    } else {
        res.status(400).json(
            { code: "failed", msg: "Something is wrong" }
        );
    }
});


app.post('/login-validation', (req, res) => {
    let email_login = req.body.email;
    let password_login = req.body.password;

    const user = profileDB.find(
        (ob) => {
            return ob.email === email_login && ob.password === password_login;
        }
    );

    if (user) {
        res.status(200).json(
            { code: "success", msg: "email and Password matched a record", loginUser: user }
        );
    } else {
        res.status(401).json({ code: "failed", msg: "Incorrect email and Password. Please try again!" });
    }
});


//CRUD  create, read, update, delete
const profileDB = [
    {
        id:1,
        firstname : "James",
        lastname : "Bond",
        phone : "97987",
        address : "New York USA",
        email : "james@yahoo.com",
    },
    {   
        id:2,
        firstname : "Peter",
        lastname : "Pan",
        phone : "97987",
        address : "California USA",
        email : "peter@yahoo.com",
    },
    {
        id:3,
        firstname : "Michael",
        lastname : "Jordan",
        phone : "97987",
        address : "California USA",
        email : "mic@google.com",
    },
    {
        id:4,
        firstname : "Vic",
        lastname : "Saints",
        phone : "9742342987",
        address : "CDO Mindanao",
        email : "vic@google.com",
    },
];

app.get('/all-profiles', (req, res)=>{
    res.json(profileDB)
})

app.get('/one-profile/:id', (req, res)=>{
   const profileId = req.params.id;
   const userFound = profileDB.find( 
            (user)=>{
                return parseInt(profileId) === parseInt(user.id)   
            } 
    )
    if (userFound){
        res.json(userFound);
    } else {
        res.status(400).json("Invalid Id")
    }
})

app.put('/update-user/:userId', (req, res)=>{
    const user_id = req.params.userId;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let address = req.body.address;
    let email = req.body.email;

    const updateUserRecord = {
        id: user_id,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        address: address,
        email: email,
    }

   const updateThisRecord =  profileDB.findIndex( (obj) => obj.id == user_id );
   profileDB[updateThisRecord] = updateUserRecord;

   if (profileDB) {
        res.json(
            {
                code : "success",
                msg : "Update Done"
            }
        )
   } else {
      res.status(400).json(
        {
            code : "failed",
            msg : "Error encountered while updating"
        }
      )
   }

})
         
app.get('/delete-user/:userId', (req, res)=>{
    const user_id = req.params.userId;
    const indexValue =  profileDB.findIndex( (obj) => obj.id == user_id );
    profileDB.splice(indexValue, 1);

    if (profileDB) {
        res.json(
            {
                code : "success",
                msg : "Delete Done"
            }
        )
   } else {
      res.status(400).json(
        {
            code : "failed",
            msg : "Error encountered while deleting"
        }
      )
   }
    
})
 
app.post('/registration', (req, res)=>{
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let address = req.body.address;
    let email = req.body.email;

    idCoount = profileDB.length + 1;
    const newRecord = {
        id: idCoount,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        address: address,
        email: email,
    }
    
  const saveStatus = profileDB.push(newRecord);  
   if (saveStatus) {
     res.status(200).json(
        { code: "success", msg:"registration successful" }   
     )
   } else {
     res.status(401).json(
        { code: "failed", msg:"registration error in saving" }   
     )
   }

})
 

app.post('/save-data', (req, res) => {
    let fname = req.body.firstname;
    let lname = req.body.lastname;

    res.json([fname, lname])

})

app.put('/put-data/:id', (req, res) => {
     let fname = req.body.firstname;
    //let lname = req.body.lastname;

    let id = req.params.id;
   //update change firstname where id = id

    res.json([num1, fname])
})

app.delete('/delete/record/:id', (req, res)=>{
  
})


app.listen(5000)
console.log('Server is running in port 5000')
