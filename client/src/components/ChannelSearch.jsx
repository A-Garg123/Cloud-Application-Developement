import React, { useState, useEffect } from 'react';
import { getChannel, useChatContext } from 'stream-chat-react';
import { SearchIcon } from '../assets/assets';

const ChannelSearch = () => {
  const [query, setQuery] = useState('');
  const [loading , setLoading] = useState(false);
 
  const getChannels = async (text) => {
        try{
            //  todo : fetch channels
        }catch(error){
          setQuery('')
        }
  }

  const onSearch = (event) => {
    event.preventDefault();

    setLoading(true);
    // here we can get the text of the input given (beccause this is the search query)
    setQuery(event.target.value);
    getChannels(event.target.value);
  }

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper"> 
         <div className="channel-search__input__icon">
          <SearchIcon />
         </div> 
         <input 
             className="channel-search__input__text" 
             placeholder="Search" 
             type="text" 
             value={query} 
             onChange={onSearch}
          />
      </div>
    </div>
  )
}

export default ChannelSearch
