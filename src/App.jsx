
import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  // state for variables
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(true)
  const [charAllowed, setcharAllowed] = useState(true)
  const [password, setPassword] = useState('')


  // useRef() hook
  const passwordRef  = useRef(null)

  // useCallback() hook
  // generate password function
  const passwordGenerator = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    
    if(numberAllowed) str += '0123456789'
    if(charAllowed) str += '!@#$%^&*(){}[]~`_='

    for(let i  = 0 ; i <= length ; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length, numberAllowed, charAllowed, setPassword])


  // copytopassword function
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  
  return (
    <div className='w-full  bg-gray-800 max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500'>
      <h1 className='text-white text-center my-3 text-xl'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />

        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-purple-500 text-white px-3 py-1 shrink-0'>Copy</button>
      </div>

      <div className='flex justify-between items-center gap-x-3'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}} 
          />
          <label>Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setnumberAllowed((prev) => !prev);
          }} 
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id='characterInput'
          onChange={()=>{
            setcharAllowed((prev)=> !prev)
          }} 
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
