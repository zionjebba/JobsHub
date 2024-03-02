import {
    createBrowserRouter
  } from "react-router-dom";
  import App from "../App";
  import Home from "../Pages/Home";
  import '../App.css'
  import '../index.css'
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import SignSeeker from "../Pages/SignSeeker";
import SignEmployer from "../Pages/SignEmployer";
import JobDetails from "../Pages/JobDetails";
import Landing from "../Pages/Landing";
import Applicant from "../Pages/Applicant";
  


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path:"/",
          element: <Landing/>
      },
        {
            path:"/home",
            element: <Home/>
        },
        {
          path:"/post-job",
          element: <CreateJob/>
      },
      {
        path:"/my-job",
        element: <MyJobs/>
    },
    {
      path:"/edit-job/:id",
      element: <UpdateJob/>,
      loader: ({params})=> fetch(`http://localhost:5000/all-jobs/${params.id}`)
  },
  

        
      ]

    }, 
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/SignUp",
      element: <Signup/>
    },
    {
      path: "/sign-seeker",
      element: <SignSeeker/>
    },
    {
      path: "/sign-employer",
      element: <SignEmployer/>
    },
    {
      path:"/jobs/:id",
      element: <JobDetails/>,
    },
    {
      path:"/application",
      element: <Applicant/>
    }
  ]);


export default router;