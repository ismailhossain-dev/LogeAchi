import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div>
        <Link href="/" className='text-3xl text-white italic'>Loge<span className='text-blue-500 font-bold'>Achi</span></Link>
    </div>
  )
}

export default Logo