import React from 'react'
import OwnerNavbar from '../components/OwnerNavbar'
import OwnerFooter from '../components/OwnerFooter'
import OwnerHero from '../components/OwnerHero'
import OwnerStats from '../components/OwnerStats'
import OwnerDashboard from '../components/OwnerDashboard'
import OwnerWorkspaces from '../components/OwnerWorkspaces'
import OwnerMembers from '../components/OwnerMembers'
import OwnerTasks from '../components/OwnerTasks'
import OwnerReviews from '../components/OwnerReviews'
import OwnerQuickActions from '../components/OwnerQuickActions'

const OwnerHome = () => {
  return (
    <>
    <OwnerNavbar/>
    <OwnerHero/>
    <OwnerStats/>
    <OwnerWorkspaces/>
    <OwnerMembers/>
    <OwnerTasks/>
    {/* <OwnerReviews/> */}
    <OwnerQuickActions/>
    <OwnerFooter/>
    </>
  )
}

export default OwnerHome