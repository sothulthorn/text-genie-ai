'use client';

import { useState } from 'react';
import { runAi } from '@/actions/ai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

export default function Page() {
  const [response, setResponse] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await runAi(query);
      setResponse(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-5">
      <form onSubmit={handleClick}>
        <Input
          className="mb-5"
          placeholder="Ask anything"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button>Generate with AI</Button>
      </form>

      <Card className="mt-5">
        <CardHeader>AI Response will appear here...</CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ReactMarkdown>{response}</ReactMarkdown>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
