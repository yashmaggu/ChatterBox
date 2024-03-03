import React from 'react'

const SearchInput = () => {
  return (
    <form className='flex items-center gap'>
        <input type="text"
        placeholder="Search ......."
        className='input input-bordered rounded-full' 
        />
        <button className="btn btn-outline ">Search</button>
    </form>
  )
}

export default SearchInput;