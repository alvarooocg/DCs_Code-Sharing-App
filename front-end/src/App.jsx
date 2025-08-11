import {  useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom'
import './App.css'

import snippetServices from './services/snippets'

import { v4 as uuidv4 } from 'uuid'

import Logo from './assets/NoteCodeLogo.svg'
import ShareBtn from './assets/Share.svg'
import LinkBtn from './assets/link.svg'

import Editor from '@monaco-editor/react'

function App() {
  const { id } = useParams()
  const [newId, setNewId] = useState('')
  const [language, setLanguage] = useState('html')
  const [theme, setTheme] = useState('light')
  const [shared, setShared] = useState(false)
  const [code, setCode] = useState('')
  const [originalCode, setOriginalCode] = useState('')
  const [isExistingSnippet, setIsExistingSnippet] = useState(false)
  const [showCopy, setShowCopy] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      setIsExistingSnippet(true)
      snippetServices.getById(id).then(snippet => {
        setCode(snippet.code)
        setOriginalCode(snippet.code)
        setShared(true)
      }).catch(error => {
        console.error('Error loading snippet:', error)
        setIsExistingSnippet(false)
        setCode(' // Snippet not found')
      })
    } else {
      setIsExistingSnippet(false)
      setCode('')
      setOriginalCode('')
      setShared(false)
      setShowCopy(false)
    }
  }, [id])

  useEffect(() => {
    if (isExistingSnippet && originalCode !== '') {
      setShared(code === originalCode)
    }
  }, [code, originalCode, isExistingSnippet])

  const containerBg = theme === 'light' ? '#FFFFFE' : '#1e1e1e'
  const shareBg = shared === false ? '#406AFF' : '#364153'

  const shareSnippet = async () => {
    try {
      if (isExistingSnippet && id) {
        await snippetServices.update(id, { code: code })
        setOriginalCode(code)
        setShared(true)
        setShowCopy(true)
      } else {
        const generatedId = uuidv4()
        setNewId(generatedId)
        const newSnippet = {
          id: generatedId,
          code: code
        }
        await snippetServices.create(newSnippet)
        setShowCopy(true)
        navigate(`/${generatedId}`)
      }
    } catch (error) {
      console.error('Error sharing snippet:', error)
    }
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className='html'>
      
      <img src={Logo} alt='Logo de NoteCode' className='logo' />
      
      <h2 className='subtitle-top'>Create & Share</h2>
      <h2 className='subtitle-bottom'>Your Code easily</h2>
      <div 
        className="container"
        style={{ 
          backgroundColor: containerBg,
          borderColor: containerBg
          }}
        >
        <Editor 
          height='70vh'
          width='50vw'
          language={language}
          theme={theme}
          value={code}
          defaultValue='<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      h1 {
        color: #cca3a3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample... visit devChallengs.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>'
          className='editor'
          id='editor'
          onChange={value => setCode(value)}
        />
        <div className="container-bottom">
          <div className="config-select">
            <select 
              name='languages' 
              className='select'
              value={language}
              onChange={e => setLanguage(e.target.value)}
              >
              <option value='html'>HTML</option>
              <option value='css'>CSS</option>
              <option value='javascript'>JS</option>
            </select>
            <select 
              name='themes' 
              className='select'
              value={theme}
              onChange={e => setTheme(e.target.value)}
              >
              <option value='light'>Light</option>
              <option value='vs-dark'>Vs Dark</option>
            </select>
          </div>
          
          <div className='bottom-right-container'>
            <button onClick={ copyUrl() }
              className='copy-button'
              style={{ display: showCopy ? 'flex' : 'none' }}
            >
              <img src={LinkBtn} className='copy-image' />
              {`.../${id}`}
            </button>

            <button onClick={() => { shareSnippet() }} 
              className='share-button'
              style={{ 
                backgroundColor: shareBg
              }}
              disabled={shared}
              >
                <img src={ShareBtn} className='share-image'/>
              Share
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
