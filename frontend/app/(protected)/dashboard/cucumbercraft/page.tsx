import { DashboardNavbar } from '@/components/dashboard-navbar'
import DashboardPage from '@/components/dashboard-page'
import GenerateBDD from '@/components/dashboard-pages/generate-bdd'
import React from 'react'

export default function page() {
  return (
    <DashboardPage>
        <GenerateBDD/>
    </DashboardPage>
  )
}
