import React, { useState, useEffect } from 'react';
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react';

function ArticleView({ post, onBack, currentUser, setCurrentView, setBlogs }) {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    if (!currentUser) {
      setCurrentView('auth');
      return;
    }

    const comment = {
      id: Date.now(),
      author: currentUser.name, 
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      text: newComment
    };
    
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    setNewComment('');
    
    if (setBlogs) {
        setBlogs(prevBlogs => prevBlogs.map(blog => 
            blog.id === post.id ? { ...blog, comments: updatedComments } : blog
        ));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-stone-500 hover:text-rose-600 mb-10 transition-colors font-medium group"
      >
        <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={18} /> 
        Back to Journal
      </button>
      
      <article>
        <div className="mb-10 text-center">
          <p className="text-rose-600 text-sm font-bold uppercase tracking-widest mb-4">{post.date}</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-8 leading-tight">{post.title}</h1>
          <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-3xl shadow-sm mb-12">
            <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="prose prose-stone max-w-none text-lg text-stone-700 leading-relaxed space-y-8 font-light">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <div className="mt-20 pt-12 border-t border-stone-200">
        <h3 className="text-2xl font-serif font-bold text-stone-900 mb-8">
          Discussion ({comments.length})
        </h3>
        
        {currentUser ? (
          <form onSubmit={handleAddComment} className="mb-12 bg-stone-50 p-6 rounded-2xl border border-stone-100">
            <div className="flex items-center gap-2 mb-4 text-stone-700 font-medium text-sm">
              <Lock size={14} className="text-rose-600" />
              <span>Commenting as {currentUser.name}</span>
            </div>
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..." 
              className="w-full p-4 border-2 border-stone-200 rounded-xl bg-white focus:border-rose-500 focus:ring-0 outline-none resize-none mb-4"
              rows="3"
              required
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <p className="text-xs text-stone-500 flex items-center gap-1">
                <ShieldCheck size={14} className="text-green-600" /> Protected Connection
              </p>
              <button 
                type="submit"
                className="w-full sm:w-auto bg-stone-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 transition-colors"
              >
                Post Comment
              </button>
            </div>
          </form>
        ) : (
           <div className="mb-12 bg-stone-50 p-8 rounded-2xl border border-stone-100 text-center">
              <p className="text-stone-600 mb-4">Please log in to join the discussion.</p>
              <button onClick={() => setCurrentView('auth')} className="bg-stone-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-rose-700">Login to Comment</button>
           </div>
        )}

        <div className="space-y-8">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-4">
              <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center text-stone-500 font-serif font-bold flex-shrink-0">
                {comment.author.charAt(0)}
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <h4 className="font-bold text-stone-900">{comment.author}</h4>
                  <span className="text-xs text-stone-500">{comment.date}</span>
                </div>
                <p className="text-stone-700 leading-relaxed font-light">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Blog({ blogs, setBlogs, currentUser, setCurrentView }) {
  const [selectedPost, setSelectedPost] = useState(null);

  // Scroll to top when opening an article
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPost]);

  if (selectedPost) {
    return (
      <ArticleView 
        key={selectedPost.id}
        post={selectedPost} 
        onBack={() => setSelectedPost(null)}
        currentUser={currentUser}
        setCurrentView={setCurrentView}
        blogs={blogs}
        setBlogs={setBlogs}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-stone-900 mb-4">Studio Journal</h1>
        <p className="text-stone-600">Thoughts, process videos, and stories from the easel.</p>
      </div>

      <div className="space-y-16">
        {blogs.map(post => (
          <article 
            key={post.id} 
            onClick={() => setSelectedPost(post)} 
            className="grid md:grid-cols-2 gap-8 items-center group cursor-pointer"
          >
            <div className="overflow-hidden rounded-2xl aspect-video md:aspect-[4/3]">
              <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div>
              <p className="text-rose-600 text-sm font-bold uppercase tracking-widest mb-3">{post.date}</p>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4 group-hover:text-rose-700 transition-colors leading-tight">{post.title}</h2>
              <p className="text-stone-600 leading-relaxed mb-6">{post.excerpt}</p>
              <button className="font-bold text-stone-900 border-b-2 border-rose-600 pb-1">Read Article</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;
