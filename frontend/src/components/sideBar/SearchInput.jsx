import React, { useState } from 'react'
import useConversation from '../../zustand/useConversation.js';
import  useGetConversations  from '../../hooks/useGetConversations.js';
import { toast } from 'react-hot-toast';
const SearchInput = () => {
  const [search,setSearch]=useState("");

  const { setSelectedConversation }=useConversation();
  const {conversations }=useGetConversations();
  const handleSubmit = (event) => {
    event.preventDefault();
      if(!search) return;
      if(search.length < 3){
        return   toast.error("Search must be at least 3 characters long")
      }  
      
      const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
  }
  return (
    <form 
          onSubmit={handleSubmit}
          className='flex items-center gap'
      >
        <input type="text"
        placeholder="Search ......."
        className='input input-bordered rounded-full' 
        value={search}
        onChange={(e)=>{setSearch(e.target.value)}}
        />
        <button className="btn btn-outline ">Search</button>
    </form>
  )
}

export default SearchInput;