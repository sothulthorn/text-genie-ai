'use client';

import { useState } from 'react';

import { runAi } from '@/actions/ai';

export default function Page() {
  const [response, setResponse] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const data = await runAi('write a short zen story');
      setResponse(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleClick}>Run AI</button>
      <hr />
      <div>{isLoading ? 'Loading...' : response}</div>
    </>
  );
}
