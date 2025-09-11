import { useState, useEffect } from 'react';

export const useContent = (type) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`/api/content?type=${type}`);
        const data = await res.json();
        setContent(data.data || []);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    if (type) {
      fetchContent();
    }
  }, [type]);

  return { content, loading };
};