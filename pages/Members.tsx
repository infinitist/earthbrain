
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../src/firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';

const Members: React.FC = () => {
    const { currentUser, login, logout } = useAuth();
    const [posts, setPosts] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!currentUser) return;

        // Subscribe to posts
        const q = query(collection(db, 'earthbrain_posts'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Client-side filter: Show ONLY approved posts (strict moderation)
            setPosts(allPosts.filter((p: any) => p.approved === true));
        });
        return unsubscribe;
    }, [currentUser]);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !currentUser) return;
        setUploading(true);

        try {
            // 1. Prepare Image (Resize and Compress)
            const reader = new FileReader();
            const imagePromise = new Promise<string>((resolve, reject) => {
                reader.onload = async (event) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;

                        // Maximum dimensions to keep document size under 1MB
                        const MAX_WIDTH = 800;
                        const MAX_HEIGHT = 800;

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx?.drawImage(img, 0, 0, width, height);

                        // Compress heavily to ensure it fits in Firestore (limit is 1MB total doc)
                        const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
                        resolve(dataUrl);
                    };
                    img.onerror = reject;
                    img.src = event.target?.result as string;
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            const compressedBase64 = await imagePromise;

            // 2. Save Post directly to Firestore
            await addDoc(collection(db, 'earthbrain_posts'), {
                userId: currentUser.uid,
                userName: currentUser.displayName || 'Community Member',
                userPhoto: currentUser.photoURL,
                imageUrl: compressedBase64, // Storing Base64 string directly
                caption: caption,
                timestamp: new Date().toISOString(),
                approved: false
            });

            alert('Post submitted successfully! It will appear once approved by an admin.');
            setFile(null);
            setCaption('');
        } catch (err) {
            console.error(err);
            alert("Error sharing post. Please try a smaller image.");
        } finally {
            setUploading(false);
        }
    };

    if (!currentUser) {
        return (
            <div className="relative min-h-screen bg-slate-50 flex items-center justify-center pt-32 px-6">
                {/* Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-60" alt="Background" />
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
                </div>

                <div className="relative z-10 bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002-2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <h1 className="font-serif text-3xl text-emerald-950 mb-4">Members Area</h1>
                    <p className="text-slate-500 mb-8 font-light">Join the community to share photos and memories on our shared wall.</p>
                    <button
                        onClick={login}
                        className="w-full bg-emerald-950 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-900 transition-all flex items-center justify-center gap-3"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6 bg-white rounded-full p-1" alt="G" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-slate-50">
            {/* Nature Banner */}
            <div className="absolute top-0 left-0 w-full h-[60vh] overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover opacity-80"
                    alt="Community Banner"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-slate-50" />
            </div>

            <div className="relative z-10 pt-48 pb-20 px-6">
                <div className="container mx-auto max-w-2xl">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="font-serif text-4xl text-emerald-950 tracking-tight">Community Wall</h1>
                        <button onClick={logout} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-500">Sign Out</button>
                    </div>

                    {/* Upload Form */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-lg mb-12 border border-emerald-50">
                        <form onSubmit={handleUpload} className="space-y-4">
                            <textarea
                                value={caption}
                                onChange={e => setCaption(e.target.value)}
                                placeholder="Share a moment or thought..."
                                className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 resize-none"
                                rows={2}
                            />
                            <div className="flex justify-between items-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setFile(e.target.files?.[0] || null)}
                                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                />
                                <button
                                    disabled={!file || uploading}
                                    className="bg-amber-500 text-emerald-950 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs disabled:opacity-50"
                                >
                                    {uploading ? 'Posting...' : 'Post'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Feed */}
                    <div className="space-y-8">
                        {posts.map(post => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100"
                            >
                                <div className="p-6 flex items-center gap-3">
                                    {post.userPhoto && <img src={post.userPhoto} className="w-10 h-10 rounded-full" alt={post.userName} />}
                                    <div>
                                        <p className="font-bold text-emerald-950 text-sm">{post.userName}</p>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{new Date(post.timestamp).toLocaleDateString()}</p>
                                    </div>
                                    {!post.approved && (
                                        <span className="ml-auto bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                            Pending Review
                                        </span>
                                    )}
                                </div>
                                {post.imageUrl && (
                                    <img src={post.imageUrl} className="w-full h-auto max-h-[500px] object-cover" alt="Post" />
                                )}
                                <div className="p-6">
                                    <p className="text-slate-600 font-serif italic">{post.caption}</p>
                                </div>
                            </motion.div>
                        ))}
                        {posts.length === 0 && (
                            <div className="text-center py-20 text-slate-400">
                                <p>No posts yet. Be the first to share.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Members;
