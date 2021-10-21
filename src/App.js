import './App.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {light} from 'react-syntax-highlighter/dist/esm/styles/prism'
function App() {
  const[input,setInput] = useState();
  return (
    <div className="App">
      <textarea 
      autoFocus 
      className="textarea" 
      value={input} 
      onChange={
        (e) => setInput(e.target.value)
      }/>
      <ReactMarkdown children={input} remarkPlugins={[remarkGfm]} className="markdown"  components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            language={match[1]}
            PreTag="div"
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }} />
    </div>
  );
}

export default App;
