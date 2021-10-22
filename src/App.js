import './App.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import React from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import Pdf from "react-to-pdf";
import { Button,Container, Navbar ,Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
const ref = React.createRef();
function App() {
  const[input,setInput] = useState();
  return (
        <div>
         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">Sean Markdown PDF generator</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              </Nav>
              <Nav>
                <Pdf targetRef={ref} filename="document.pdf">
                        {({ toPdf }) => <Button variant="outline-light" onClick={toPdf}>Generate Pdf</Button>}
                      </Pdf> 
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="App">
          <textarea 
          autoFocus 
          className="textarea" 
          value={input} 
          onChange={
            (e) => setInput(e.target.value)
          }/>
          <section ref={ref}>
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
          </section>

          </div>
          </div>
  );
}

export default App;
