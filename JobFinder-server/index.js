
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
const multer = require('multer');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+file.originalname)
  }
});
const upload = multer({ storage: storage });

require('dotenv').config();

//middleware
app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"))

//user: greyson233 password:VURZDlXCLKRigsSm
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yfu2a4v.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

       //create db
       const db = client.db("mernJobFinder");
       const jobsCollections = db.collection("demoJobs");
       const jobApplications= db.collection("JobApplication")


       //post application
       app.post("/application",upload.single('resume'), async(req,res)=>{
        const body= req.body;
        body.createAt = new Date();
        // Assuming 'resume' field contains the file path after upload
         body.resume = req.file.path; 
        //console.log(body);
        const result= await jobApplications.insertOne(body);
        if(result.insertedId){
          return res.status(200).send(result);
        }
        else{
          return res.status(404).send({
            message: "can not insert! Try Again",
            status: false
          })
        }
       })
       //get all applications
       app.get("/all-applications",async(req,res)=>{
        const jobs = await jobApplications.find({}).toArray()
        res.send(jobs);
       })

       //get all applications based on current user
       app.get("/all-applications/:email", async(req,res)=>{
        const jobs = await jobApplications.find({applicantEmail
          : req.params.email}).toArray();
        res.send(jobs);
        //console.log(jobs);
   })

   //get all applications based on current user
   app.get("/all-application/:employeremail", async(req,res)=>{
    const jobs = await jobApplications.find({recruiterEmail
      : req.params.employeremail}).toArray();
    res.send(jobs);
    //console.log(jobs);
})
       

       //post a job
       app.post("/post-job", async(req,res)=>{
        const body= req.body;
        body.createAt = new Date();
        //console.log(body);
        const result= await jobsCollections.insertOne(body);
        if(result.insertedId){
          return res.status(200).send(result);
        }
        else{
          return res.status(404).send({
            message: "can not insert! Try Again",
            status: false
          })
        }
       })

       // get all jobs
       app.get("/all-jobs",async(req,res)=>{
        const jobs = await jobsCollections.find({}).toArray()
        res.send(jobs);
       })

         //get single job using id
         app.get("/all-jobs/:id", async (req,res)=>{
          const id = req.params.id;
          const job = await jobsCollections.findOne({
            _id :new ObjectId(id)
          })
          res.send(job);
         })


      app.get("/myJobs/:email", async(req,res)=>{
           const jobs = await jobsCollections.find({postingBy: req.params.email}).toArray();
           res.send(jobs);
           //console.log(jobs);
      })
        //delete a job
       app.delete("/job/:id",async (req,res)=>{
        const id = req.params.id;
        const filter = {_id:new ObjectId(id)}
        const result = await jobsCollections.deleteOne(filter);
        res.send(result);

       })

       //Update job
       app.put("/update-job/:id",async (req,res)=>{
        const id = req.params.id;
        const jobData= req.body;
        const filter = {_id : new ObjectId(id)};
        const options ={upsert: true};
        const updateDoc = {
          $set: {
            ...jobData
          },
        };
        const result = await jobsCollections.updateOne(filter, updateDoc, options);
        res.send(result);
       })

       app.put("/update-application/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const { status } = req.body;
    
            // Update the status of the job application
            const result = await jobApplications.updateOne(
                { _id: new ObjectId(id) },
                { $set: { status: status } }
            );
    
            if (result.modifiedCount === 1) {
                res.status(200).json({ message: "Job application status updated successfully" });
            } else {
                res.status(404).json({ message: "Job application not found or not updated" });
            }
        } catch (error) {
            console.error("Error updating job application status:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    
       



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});