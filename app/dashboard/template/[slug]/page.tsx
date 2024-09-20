'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CopyIcon, Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import template from '@/utils/template';
import { useEffect, useRef, useState } from 'react';
import { runAi } from '@/actions/ai';
import toast from 'react-hot-toast';
import { saveQuery } from '@/actions/ai';
import { useUser } from '@clerk/nextjs';
import { Template } from '@/utils/types';
import { useUsage } from '@/context/usage';
import { Editor } from '@tinymce/tinymce-react';

const Page = ({ params }: { params: { slug: string } }) => {
  const [query, setQuery] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { fetchUsage, subscribed, count } = useUsage();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || '';

  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (content && editorRef.current) {
      editorRef.current.setContent(content);
    }
  }, [content]);

  const t = template.find((item) => item.slug === params.slug) as Template;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await runAi(t.aiPrompt + query);
      setContent(data);

      // Save to Database
      await saveQuery(t, email, query, data);
      fetchUsage();
    } catch (error) {
      setContent('An error occurred, Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      try {
        await navigator.clipboard.writeText(content);
        toast.success('Content copied to clipboard');
      } catch (error) {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between mx-5 mb-2">
        <Link href="/dashboard">
          <Button>
            <ArrowLeft /> <span className="ml-2">Back</span>
          </Button>
        </Link>

        <Button onClick={handleCopy}>
          <CopyIcon /> <span className="ml-2">Copy</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
        <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md broder p-5">
          {/* Template Info */}
          <div className="flex flex-col gap-3">
            <Image src={t.icon} alt={t.name} width={50} height={50} />
            <h2 className="font-medium text-lg">{t.name}</h2>
            <p className="text-gray-500">{t.desc}</p>
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            {t.form.map((item) => (
              <div className="my-2 flex flex-col gap-2 mb-7">
                <label className="font-bold pb-5">{item.label}</label>

                {item.field === 'input' ? (
                  <Input
                    name={item.name}
                    required={item.required}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                ) : (
                  <Textarea
                    name={item.name}
                    required={item.required}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                )}
              </div>
            ))}

            <Button
              type="submit"
              className="w-full py-6"
              disabled={
                isLoading ||
                (!subscribed &&
                  count >= Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE))
              }
            >
              {isLoading && <Loader2Icon className="animate-spin mr-2" />}
              {subscribed ||
              count < Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE)
                ? 'Generate Content'
                : 'Subscribe to generate content'}
            </Button>
          </form>
        </div>

        <div className="col-span-2">
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
            onInit={(evt, editor) => {
              // @ts-ignore
              editorRef.current = editor;
            }}
            onEditorChange={(content) => setContent(content)}
            init={{
              height: 600,
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'codesample',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'markdown',
              ],
              toolbar:
                'undo redo | ' +
                'codesample | bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist ',
              content_style: 'body { font-family:Inter; font-size:16px }',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
