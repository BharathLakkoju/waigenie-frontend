import DashboardPage from '@/components/dashboard-page'
import AutomationCodeGenerator from '@/components/dashboard-pages/dashboard-autoscribe'
import React from 'react'

export default function page() {
  return (
    <DashboardPage>
        <AutomationCodeGenerator/>
    </DashboardPage>
  )
}
