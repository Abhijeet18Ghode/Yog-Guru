'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function BlogDetail() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/content?type=blog');
        const data = await res.json();
        if (data.success) {
          const foundPost = data.data.find(p => p._id === params.id);
          setPost(foundPost);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-amber-50 flex items-center justify-center pt-24">
          <div className="text-amber-700">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-amber-50 flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-amber-900 mb-4">Post Not Found</h1>
            <Link href="/" className="text-amber-600 hover:text-amber-700">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-amber-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/" className="text-amber-600 hover:text-amber-700 mb-8 inline-block">
            ← Back to Home
          </Link>
          
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {post.content?.image && (
              <img 
                src={post.content.image} 
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            )}
            
            <div className="p-8">
              <div className="flex items-center mb-4">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                  {post.content?.category || 'Yoga'}
                </span>
                <span className="text-gray-500 ml-4 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-amber-900 mb-4">
                {post.title}
              </h1>
              
              {post.content?.excerpt && (
                <p className="text-lg text-amber-700 mb-6 italic">
                  {post.content.excerpt}
                </p>
              )}
              
              <div className="prose prose-amber max-w-none">
                {post.content?.body ? (
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {post.content.body}
                  </div>
                ) : (
                  <p className="text-gray-600">No content available for this post.</p>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}