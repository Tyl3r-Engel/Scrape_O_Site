import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

export default function Save({args}) {
  const [isSaved, setIsSaved] = useState(false)
  const {currentSearchData, currentUser, setIsError} = args
  let buttonRef;
  useEffect(() => {
    setIsSaved(false)
  }, [currentSearchData])

  const handleSave = async () => {
    if(currentUser.userName === '') {setIsError({state:true, message:'you need to login first'}); return}
    const config = {
      url: '/history',
      method: 'POST',
      data: {
        userName: currentUser.userName,
        currentSearchData,
      }
    }
    await axios(config)
    setIsSaved(true)
    buttonRef.disabled = true
  }

  return (
    <Button ref={buttonRef} variant="primary" type="button" onClick={handleSave}>
      {isSaved ? (
        'SAVED!'
      ) : (
        'SAVE'
      )}
    </Button>
  )
}