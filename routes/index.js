import express from 'express'
import { registerUser } from '../controllers/registerUser.js'
import tokenVerification from '../controllers/tokenVerification.js'
import checkEmail from '../controllers/checkEmail.js'
import verifyPassword from '../controllers/verifyPassword.js'
import addProject from '../controllers/addProject.js'
import editProjectDetail from '../controllers/editProjectDetail.js'
import deleteProject from '../controllers/deleteProject.js'
import getUserprojects from '../controllers/getUserProjects.js'
import allProjectDetails from '../controllers/allProjectDetails.js'
import { userDeatils } from '../controllers/userDetails.js'
import userDetailsUsingToken from '../controllers/userDetailUsingCookie.js'
import alllUserData from '../controllers/allUserData.js'
import getAllProjectsUsingId from '../controllers/getAllProjectsUsingId.js'

const router = express.Router()

router
    .post('/register', registerUser)
    .post('/verify-email/:token', tokenVerification)
    .post('/email', checkEmail)
    .post('/password', verifyPassword)
    .post('/project-add', addProject)
    .post('/edit-project', editProjectDetail)
    .post('/delete', deleteProject)
    .get('/userProjects', getUserprojects)
    .get('/admin/projects', allProjectDetails)
    .post('/userDetails', userDeatils)
    .post('/login-verificaton', userDetailsUsingToken)
    .get('/admin/allusersdata', alllUserData)
    .post('/admin/getUserDataWithId' , getAllProjectsUsingId)

export { router }