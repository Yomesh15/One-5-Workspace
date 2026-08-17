import React from 'react'
import MemberNavbar from '../components/MemberNavbar'
import MemberHero from '../components/MemberHero'
import MemberFooter from '../components/MemberFooter'
import Stats from '../components/Stats'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import OwnerVsMember from '../components/OwnerVsMember'
import TaskLifecycle from '../components/TaskLifecycle'
import WhyOne5 from '../components/WhyOne5'

const MemberHome = () => {
  return (
    <>
      <MemberNavbar />
      <MemberHero />
      <Stats/>
      <Features/>
      <HowItWorks/>
      <OwnerVsMember/>
      <TaskLifecycle/>
      <WhyOne5/>
      <MemberFooter />
    </>
  )
}

export default MemberHome
