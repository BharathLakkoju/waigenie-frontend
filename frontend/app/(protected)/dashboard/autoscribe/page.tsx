import DashboardPage from '@/components/dashboard-page'
import AutomationCodeGenerator from '@/components/dashboard-pages/automate-code'
import React from 'react'

export default function page() {
  return (
    <DashboardPage>
        <AutomationCodeGenerator/>
    </DashboardPage>
  )
}
