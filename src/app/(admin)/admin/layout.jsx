import DashboardWrapper from '@/components/admin/shared/DashboardWrapper/DashboardWrapper'
import React from 'react'

function layout({children}) {
  return (
    <div className='text-white'>
        <DashboardWrapper>{children}</DashboardWrapper>
    </div>
  )
}

export default layout