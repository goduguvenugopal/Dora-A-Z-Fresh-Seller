import React from 'react'
import { useOutletContext } from 'react-router-dom'

const ProductUpdateForm = () => {
    const {id} = useOutletContext()
    
  return (
    <div>
      {id}
    </div>
  )
}

export default ProductUpdateForm