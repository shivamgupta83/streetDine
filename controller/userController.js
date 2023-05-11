const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const { validAll, validName, validemail } = require("../validation/validation")


const createUser = async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    keys.map((keys) => { if (!["email", "password", "name"].includes(keys)) return res.status(400).send({ status: false, message: `${keys} is not valid plese enter only email, password, name, dob` }) })

    let { email, password, name, } = body;

    if (!email) return res.status(400).send({ status: false, message: "email is not presnt" })
    if (!validAll(email)) return res.status(400).send({ status: false, message: "email is not valid" })
    if (!validemail(email)) return res.status(400).send({ status: false, message: "email is not valid" })

    if (!password) return res.status(400).send({ status: false, message: "password is not presnt" })
    if (!validAll(password)) return res.status(400).send({ status: false, message: "password is not valid" })


    if (!name) return res.status(400).send({ status: false, message: "name is not presnt" })
    name = name.replace(/\s+/g, ' ')
    if (!validAll(name)) return res.status(400).send({ status: false, message: "name is not valid" })
    if (!validName(name)) return res.status(400).send({ status: false, message: "name is not valid" })


    const savedData = await userModel.create(body)
    if (!savedData) return res.status(500).send({ status: true, message: "not created" })

    return res.status(200).send({status:true, message: "user is created" ,data:savedData})
  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const loginUser = async function (req, res) {
  try {

    email = req.body.email
    password = req.body.password

    if (!email) return res.status(400).send({ status: false, msg: "email id is required" })

    if (!password) return res.status(400).send({ status: false, msg: "Password is required" })

    let getUser = await userModel.findOne({ email: email, password: password })

    if (!getUser) return res.status(404).send({ status: false, msg: "User not found" })

    let Payload = {
      userId: getUser._id,
    }

    const token = jwt.sign(Payload, "key")

    return res.status(200).send({ status: true, message: "logined", token: token })


  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: error.message, msg: "server error" })
  }
}

module.exports = { loginUser, createUser }