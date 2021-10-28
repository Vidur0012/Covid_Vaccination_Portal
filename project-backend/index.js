import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import centerR from './routes/centerR.js'
import beneficiaryR from './routes/beneficiaryR.js'
import adminR from './routes/adminR.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


app.use("/beneficiary",beneficiaryR);
app.use("/centers",centerR);
app.use("/admin",adminR);

//local db
//mongodb://localhost/covidPortalLocalDB

//remote
//mongodb+srv://harsh:harsh@cluster0.ja51q.mongodb.net/CovidPortalDB?retryWrites=true&w=majority


mongoose.connect('mongodb+srv://harsh:harsh@cluster0.ja51q.mongodb.net/CovidPortalDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.warn("DB connected")
});



app.listen(9700, () => {
    console.log("Server Started")
});


