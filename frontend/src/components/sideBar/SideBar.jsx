import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
const SideBar = () => {
  return (
    <div className='border-r border-slate-500 p-8 flex flex-col '>

      <SearchInput />
      <div style={{ marginTop: '30px' }}>
      {/* Content of Component Two */}
    </div>
        <Conversations />
        <span></span>
        <div style={{ marginTop: '30px' }}>
      {/* Content of Component Two */}
    </div>
        <LogoutButton />

    </div>
  )
}

export default SideBar