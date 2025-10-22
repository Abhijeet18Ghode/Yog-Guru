"use client";
import { useState, useEffect } from 'react';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Test API connection
  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => console.log('API Test:', data))
      .catch(err => console.error('API Test Error:', err));
  }, []);

  const fetchBlogs = async () => {
    try {
      console.log('Fetching blogs...');
      let res = await fetch('/api/blogs');
      
      // Fallback to local storage if MongoDB fails
      if (!res.ok) {
        console.log('MongoDB failed, trying local storage...');
        res = await fetch('/api/blogs-local');
      }
      
      const data = await res.json();
      console.log('Response data:', data);
      if (data.success) {
        setBlogs(data.data);
      } else {
        console.error('API Error:', data.error);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('shortDescription', formData.shortDescription);
    formDataToSend.append('longDescription', formData.longDescription);
    
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    if (editingBlog) {
      formDataToSend.append('id', editingBlog._id);
    }

    try {
      let res = await fetch('/api/blogs', {
        method: editingBlog ? 'PUT' : 'POST',
        body: formDataToSend
      });
      
      // Fallback to local storage if MongoDB fails
      if (!res.ok && res.status === 500) {
        res = await fetch('/api/blogs-local', {
          method: editingBlog ? 'PUT' : 'POST',
          body: formDataToSend
        });
      }

      const data = await res.json();
      
      if (data.success) {
        setMessage(editingBlog ? '✅ Blog updated successfully!' : '✅ Blog created successfully!');
        fetchBlogs();
        closeModal();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ ' + (data.error || 'Something went wrong'));
      }
    } catch (error) {
      setMessage('❌ Error saving blog: ' + error.message);
    }
    
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      let res = await fetch(`/api/blogs?id=${id}`, {
        method: 'DELETE'
      });
      
      // Fallback to local storage if MongoDB fails
      if (!res.ok && res.status === 500) {
        res = await fetch(`/api/blogs-local?id=${id}`, {
          method: 'DELETE'
        });
      }

      const data = await res.json();
      
      if (data.success) {
        setMessage('✅ Blog deleted successfully!');
        fetchBlogs();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ ' + (data.error || 'Error deleting blog'));
      }
    } catch (error) {
      setMessage('❌ Error deleting blog: ' + error.message);
    }
  };

  const openModal = (blog = null) => {
    setEditingBlog(blog);
    setFormData({
      title: blog?.title || '',
      shortDescription: blog?.shortDescription || '',
      longDescription: blog?.longDescription || '',
      image: null
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setFormData({ title: '', shortDescription: '', longDescription: '', image: null });
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <button
            onClick={() => openModal()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add New Blog
          </button>
        </div>

        {message && (
          <div className={`mb-4 p-4 rounded-lg border ${
            message.includes('✅') 
              ? 'bg-green-100 border-green-400 text-green-700' 
              : 'bg-red-100 border-red-400 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No blogs created yet. Create your first blog!</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {blog.imagePath && (
                  <img
                    src={blog.imagePath}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/400/250?text=Blog+Image';
                    }}
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.shortDescription}</p>
                  <div className="text-xs text-gray-400 mb-3">
                    Created: {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(blog)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                {editingBlog ? 'Edit Blog' : 'Add New Blog'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description
                  </label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Long Description
                  </label>
                  <textarea
                    value={formData.longDescription}
                    onChange={(e) => setFormData({...formData, longDescription: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image {editingBlog && '(Leave empty to keep current image)'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        console.log('File selected:', file.name, file.size);
                        setFormData({...formData, image: file});
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required={!editingBlog}
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading || !formData.title || !formData.shortDescription || !formData.longDescription || (!editingBlog && !formData.image)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      editingBlog ? '⚙️ Update Blog' : '✨ Create Blog'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}