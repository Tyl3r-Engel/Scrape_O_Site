import React, { useState, useEffect } from 'react';
import { Button, Col } from 'react-bootstrap';
import axios from 'axios';

export default function Search({args}) {
  const {
    setCurrentSearchData,
    currentSelection,
    isSearching,
    setIsSearching,
    setIsError
   } = args
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => {
    if (isSearching) {
      axios.get(`/api?website=${currentSelection}&userQuery=${searchQuery}`).then((data) => {
        setIsSearching(false)
        setCurrentSearchData(data.data)
      }).catch((e) => {setIsError({state:true, message:'need to select a website'}); setIsSearching(false)})
    }
  }, [isSearching])

  const handleClick = () => setIsSearching(true);

  return (
    <Col className="text-center" >
      <input className="p-1" type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
      <Button
      variant="primary"
      disabled={isSearching}
      onClick={!isSearching ? handleClick : null}
      >
        {isSearching ? 'Loading…' : 'Search'}
      </Button>
    </Col>
  )
}
