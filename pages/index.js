import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;

    setApiOutput(`${output}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Trying out GPT-3</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Post creator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Create a detailed post on the topics you like</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="start typing here" className="prompt-box"
            value={userInput}
            onChange={onUserChangedText} />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Home;
