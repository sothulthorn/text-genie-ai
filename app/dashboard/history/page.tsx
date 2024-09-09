'use client';

import { useState, useEffect } from 'react';
import { getQueries } from '@/actions/ai';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import QueryTable from '@/components/table/query-table';

interface QueryResponse {
  queries: [];
  totalPages: number;
}

const Page = () => {
  const [queries, setQueries] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || '';

  useEffect(() => {
    if (page === 1 && email) fetchQueries();
  }, [page, email]);

  useEffect(() => {
    if (page > 1 && email) loadMore();
  }, []);

  const fetchQueries = async () => {
    setIsLoading(true);

    try {
      const response = (await getQueries(
        email,
        page,
        perPage
      )) as QueryResponse;
      setQueries(response.queries);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const response = (await getQueries(
        email,
        page,
        perPage
      )) as QueryResponse;
      setQueries([...queries, ...response.queries]);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!queries.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin mx-2" />
      </div>
    );
  }

  return (
    <div>
      <div className="p-10 my-5 mx-5 mb-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center">
        <h1 className="text-xl">History</h1>
        <p className="text-sm text-gray-500">Your previous search history</p>
      </div>

      <div className="p-5 rounded-lg flex flex-col justify-center">
        <QueryTable data={queries} />
      </div>

      <div className="text-center my-5">
        {page < totalPages && (
          <Button onClick={() => setPage(page + 1)} disabled={isLoading}>
            {isLoading ? <Loader2Icon className="animate-spin" /> : 'Load more'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Page;
