import React from 'react';
import logo from './logo.svg';
import './App.css';
import PreViewArea from './components/preview-area';

const test_md = `# header  
## header
### header
#### header
##### header

---

|col1|col2|col3|
|:--|:-:|--:|
|row1-1|row1-2|row1-3|
|row1-1|row1-2|row1-3|
|row1-1|row1-2|row1-3|

- ul
- ul
  - ul
- ul

1. ol
1. ol
1. ol
1. ol


**bold**  
*iteric*  

\`code\`  

\`\`\`python
import numpy as np

# code ...

\`\`\`

[link](https://google.com)
`

function App() {

  const [mdText, setMd] = React.useState(test_md);

  return (
    <>
      <div className="columns-2">
          <textarea className="ml-2 mr-0 my-2 px-2 py-2 border border-lime-400 rounded-md" name="md-area" id="md" value={mdText} onChange={(e) => {setMd(e.target.value);}} cols={80} rows={60}>{mdText}</textarea>
          <PreViewArea id="preview" md={mdText} />
      </div>
    </>
  )

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
