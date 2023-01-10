import React, { useState} from 'react'
import SearchCard from './SearchCard';
import SearchPost from './SearchPost';

export default function SearchSend() {
    const[tquery , setTquery] = useState('');
    console.log(tquery);
    return(
            <div>
                <SearchCard setTquery={setTquery}/>
                <SearchPost Tquery={tquery}/>
            </div>
            );
}