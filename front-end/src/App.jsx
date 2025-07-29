import './App.css'

import Logo from './assets/NoteCodeLogo.svg'
import ShareBtn from './assets/Share.svg'

import Editor from '@monaco-editor/react'

function App() {

  return (
    <div className='html'>
      
      <img src={Logo} alt='Logo de NoteCode' className='logo' />
      
      <h2 className='subtitle-top'>Create & Share</h2>
      <h2 className='subtitle-bottom'>Your Code easily</h2>
      <div className="container">
        <Editor 
          height='70vh'
          width='50vw'
          defaultLanguage='html'
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
        />
        <div className="container-bottom">
          <div className="config-select">
            <select name='languages' className='select'>
              <option value='html'>HTML</option>
              <option value='css'>CSS</option>
              <option value='javascript'>JS</option>
            </select>
            <select name='themes' className='select'>
              <option value='light'>Light</option>
              <option value='dark'>Dark</option>
            </select>
          </div>

          <button onClick={() => {  }} className='share-button'><img src={ShareBtn} className='share-image'/>Share</button>
        </div>

      </div>
    </div>
  )
}

export default App
