'use client';
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [content, setContent] = useState([]);
  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState({ title: '', content: {} });
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const tabs = [
    { id: 'hero', name: 'Hero Section' },
    { id: 'blog', name: 'Blog Posts' },
    { id: 'session', name: 'Sessions' },
    { id: 'contact', name: 'Contact Info' },
    { id: 'settings', name: 'Settings' }
  ];

  useEffect(() => {
    fetchContent();
  }, [activeTab]);

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/content?type=${activeTab}`);
      const data = await res.json();
      setContent(data.data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId 
        ? JSON.stringify({ id: editingId, ...formData })
        : JSON.stringify({ type: activeTab, ...formData });
      
      const res = await fetch('/api/content', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body
      });
      if (res.ok) {
        fetchContent();
        setFormData({ title: '', content: {} });
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this content?')) return;
    
    try {
      const res = await fetch(`/api/content?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchContent();
      }
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      });
      const data = await res.json();
      if (data.success) {
        setFormData({
          ...formData,
          content: { ...formData.content, image: data.url }
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const renderContentFields = () => {
    switch (activeTab) {
      case 'hero':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                value={formData.content?.subtitle || ''}
                onChange={(e) => setFormData({...formData, content: {...formData.content, subtitle: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                value={formData.content?.description || ''}
                onChange={(e) => setFormData({...formData, content: {...formData.content, description: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        );
      case 'blog':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Excerpt</label>
              <textarea
                rows={2}
                value={formData.content?.excerpt || ''}
                onChange={(e) => setFormData({...formData, content: {...formData.content, excerpt: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                rows={6}
                value={formData.content?.body || ''}
                onChange={(e) => setFormData({...formData, content: {...formData.content, body: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={formData.content?.category || ''}
                onChange={(e) => setFormData({...formData, content: {...formData.content, category: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Category</option>
                <option value="Hatha Yoga">Hatha Yoga</option>
                <option value="Vinyasa">Vinyasa</option>
                <option value="Ashtanga">Ashtanga</option>
                <option value="Pranayama">Pranayama</option>
                <option value="Meditation">Meditation</option>
                <option value="Ayurveda">Ayurveda</option>
                <option value="Chakras">Chakras</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Mantras">Mantras</option>
                <option value="Spirituality">Spirituality</option>
                <option value="Wellness">Wellness</option>
                <option value="Beginner Tips">Beginner Tips</option>
              </select>
            </div>
          </>
        );
      case 'session':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                value={formData.content?.duration || ''}
                onChange={(e) => setFormData({...formData, content: {...formData.content, duration: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="text"
                value={formData.content?.price || ''}
                onChange={(e) => setFormData({...formData, content: {...formData.content, price: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                value={formData.content?.description || ''}
                onChange={(e) => setFormData({...formData, content: {...formData.content, description: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        );
      case 'contact':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={formData.content?.phone || ''}
                onChange={(e) => setFormData({...formData, content: {...formData.content, phone: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.content?.email || ''}
                onChange={(e) => setFormData({...formData, content: {...formData.content, email: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={formData.content?.address || ''}
                onChange={(e) => setFormData({...formData, content: {...formData.content, address: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        );
      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">Content (JSON)</label>
            <textarea
              rows={6}
              value={JSON.stringify(formData.content || {}, null, 2)}
              onChange={(e) => {
                try {
                  setFormData({...formData, content: JSON.parse(e.target.value)});
                } catch {}
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Yog Guru Admin</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          <div className="w-64">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Manage {tabs.find(t => t.id === activeTab)?.name}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                {activeTab === 'blog' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                    {formData.content?.image && (
                      <img src={formData.content.image} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />
                    )}
                  </div>
                )}

                {renderContentFields()}

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
                  >
                    {editingId ? 'Update Content' : 'Save Content'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ title: '', content: {} });
                        setEditingId(null);
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <div className="mt-8">
                <h3 className="text-md font-medium text-gray-900 mb-4">Existing Content</h3>
                <div className="space-y-4">
                  {content.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                          {item.content?.image && (
                            <img src={item.content.image} alt="Content" className="mt-2 h-16 w-16 object-cover rounded" />
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setFormData({ title: item.title, content: item.content || {} });
                              setEditingId(item._id);
                            }}
                            className="text-amber-600 hover:text-amber-700 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}