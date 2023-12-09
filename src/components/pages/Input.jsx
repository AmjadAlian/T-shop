import React from 'react'

export default function Input({ type = 'text', id, name, value, onChange, errors,onBlur,touched,placeholder }) {
  return (
    <>
      <div className="input-group mb-2">
        <div className=' w-100'>
        
        <input type={type} className="input form-control" name={name} id={id} value={value} onChange={onChange} placeholder={placeholder} onBlur = {onBlur} />
        {touched[name]&& errors[name] && <p className='text text-danger'>{errors[name]}</p>}
        </div>
      </div>
    </>
  )
}
