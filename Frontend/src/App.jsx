import React from 'react'
import { Routes, Route } from "react-router-dom"
import MemberHome from './member/pages/MemberHome'
import { Toaster } from "sonner"
import Register from './member/pages/MemberRegister'
import Login from './member/pages/MemberLogin'
import MemberLanding from './member/pages/MemberLanding'
import OwnerHome from './owner/pages/OwnerHome'
import OwnerRegister from './owner/pages/OwnerRegister'
import OwnerLogin from './owner/pages/OwnerLogin'
import OwnerLanding from "./owner/pages/OwnerLanding"
import ForgotPassword from './member/pages/ForgotPassword'
import ForgotPasswordd from './owner/pages/ForgotPasswordd'
import CreateWorkspace from './owner/pages/CreateWorkspace'
import AllWorkspaces from './owner/pages/AllWorkspaces'
import ParticularWorkspace from './owner/pages/ParticularWorkspace'
import MemberWorkspaces from './member/pages/MemberWorkspaces'
import CreateTask from './owner/pages/CreateTask'
import Tasks from './owner/pages/Tasks'
import MemberTasks from './member/pages/MemberTasks'
import Team from './owner/pages/Team'
import Profile from './member/pages/Profile'
import ParticularWorkspace2 from './member/pages/ParticularWorkspace2'
import DashboardPreview from './member/pages/DashboardPreview'
import OwnerProfile from './owner/pages/OwnerProfile'
import ParticularTasks from './member/pages/ParticularTasks'
import TaskResponse from './owner/pages/TaskResponse'
import AdminLogin from './admin/pages/AdminLogin'
import AdminHome from './admin/pages/AdminHome'
import AdminProtect from './admin/protect/adminprotect'


const App = () => {
  return (
    <>
      <Routes>

        {/* member  */}
        <Route path='/' element={<MemberLanding />} />
        <Route path='/member' element={<MemberLanding />} />
        <Route path='/member-home' element={<MemberHome />} />
        <Route path='/member-register' element={<Register />} />
        <Route path='/member-login' element={<Login />} />
        <Route path='/member-forgot-password' element={<ForgotPassword />} />
        <Route path='/member-workspace' element={<MemberWorkspaces />} />
        <Route path='/member-tasks' element={<MemberTasks />} />
        <Route path='/member-task/:id' element={<ParticularTasks />} />
        <Route path='/member-profile' element={<Profile />} />
        <Route path='/member-workspace/:id' element={<ParticularWorkspace2 />} />
        <Route path='/member-dashboard' element={<DashboardPreview />} />

        {/* owner  */}
        <Route path='/owner' element={<OwnerLanding />} />
        <Route path='/owner-home' element={<OwnerHome />} />
        <Route path='/owner-register' element={<OwnerRegister />} />
        <Route path='/owner-login' element={<OwnerLogin />} />
        <Route path='/owner-forgot-password' element={<ForgotPasswordd />} />
        <Route path='/create-workspace' element={<CreateWorkspace />} />
        <Route path='/owner-workspace' element={<AllWorkspaces />} />
        <Route path='/owner-workspace/:id' element={<ParticularWorkspace />} />
        <Route path='/create-task/:id' element={<CreateTask />} />
        <Route path='/owner-tasks' element={<Tasks />} />
        <Route path='/owner-task-response/:id' element={<TaskResponse />} />
        <Route path='/owner-team' element={<Team />} />
        <Route path='/owner-profile' element={<OwnerProfile />} />



        {/* addmin  */}
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/admin-home' element={
          <AdminProtect>
            <AdminHome />
          </AdminProtect>
        } />


      </Routes>

      <Toaster position='bottom-right' richColors />
    </>
  )
}

export default App