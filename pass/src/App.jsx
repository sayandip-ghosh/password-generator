import { useCallback, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [length, setLength] = useState(6)
  const [numbers, setNumbers] = useState(false)
  const [characters, setCharacters] = useState(false)
  const [password, setPassword] = useState('')
  const [view, setView] = useState('password')
  const [icon,setIcon] = useState('../public/view.png')

  const generatePassword = useCallback(()=>{
    let pass=''
    let str ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numbers){
      str += '0123456789'
    }
    if(characters){
      str += '!@#$%^&*()_+'
    }
    for(let i=0;i<length;i++){
      pass += str.charAt(Math.floor(Math.random()*str.length))
    }
    setPassword(pass)

  },[length,numbers,characters])

  useEffect(generatePassword,[length,numbers,characters])

  useEffect(()=>{
    setView('password')
    setIcon('../public/view.png')
  },[length,numbers,characters])

  return (
    <>
      <div className="flex justify-center items-center mt-12 bg-gray-800 rounded-2xl w-full mx-auto max-w-md p-5">
        <div>
          <div className="flex justify-between">
        <p className='text-2xl mb-5 text-white'>Password Generator</p>
        <button onClick={generatePassword}><img className='w-6 pb-3' src="../public/refresh.png" /></button>
        </div>
        <div className="flex bg-gray-100 rounded-lg">
        <input className='rounded-lg border-black p-2 m-auto w-full' value={password} type={view} placeholder='Password' />
        <button className='mx-2' onClick={()=>{
    setView((prev) => prev === 'password' ? 'text' : 'password')
    setIcon((prev) => prev === '../public/view.png' ? '../public/hide.png' : '../public/view.png')
  }}>
          <img className='w-7' src={icon} />
        </button>
        <button className='mx-2' onClick={()=>{
          window.navigator.clipboard.writeText(password)
          toast.success("Password Copied",{position:'bottom-center', theme:'dark'})
        }}>
          <img className='w-7' src='../public/copy.png' />
        </button>
        <ToastContainer limit={3} autoClose={1500} />
        </div>
        <div className="flex mt-4">
        <input className='block' type="range" value={length} min={6} max={20} onChange={(e)=>{setLength(e.target.value)}}  />
        <label className='text-white mr-3 ml-1'>Length:{length}</label>
        <input className='' type="checkbox" onClick={()=>{
          setNumbers((prev) => !prev)
        }} />
        <label className='text-white mr-3 ml-1'>Numbers</label>
        <input className='' type="checkbox" onClick={()=>{
          setCharacters((prev) => !prev)
        }} />
        <label className='text-white mr-3 ml-1'>Characters</label>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
