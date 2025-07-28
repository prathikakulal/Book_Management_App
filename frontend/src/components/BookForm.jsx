import React, { useState, useContext } from 'react';
import { BookContext } from "../context/BookContext";
import { useToast } from '../context/ToastContext';

const BookForm = () => {
    const { addBook, uploadProgress } = useContext(BookContext);
    
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !author) {
            setFormError('Please fill in both title and author.');
            return;
        }
        setLoading(true);
        setFormError('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        if (coverImage) {
            formData.append('coverImage', coverImage);
        }

        try {
            await addBook(formData);
            setTitle('');
            setAuthor('');
            setCoverImage(null);
            setPreview('');
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };
    const progressBarStyle = {
        container: {
            height: '10px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '5px',
            marginTop: '1rem',
            overflow: 'hidden'
        },
        filler: {
            height: '100%',
            width: `${uploadProgress}%`,
            backgroundColor: '#f953c6',
            borderRadius: 'inherit',
            textAlign: 'right',
            transition: 'width 0.4s ease-in-out'
        }
    };

    return (
        <div className="book-form-container">
            <div className="book-form-header">
                <span className="icon">✒</span>
                <h2>Add a New Book</h2>
            </div>
            
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <div className="input-with-icon">
                        <span className="input-icon">📖</span>
                        <input id="title" type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., The Great Gatsby" required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <div className="input-with-icon">
                        <span className="input-icon">👤</span>
                        <input id="author" type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g., F. Scott Fitzgerald" required />
                    </div>
                </div>
                <div className="form-group">
                    <label>Cover Image</label>
                    <div className="file-upload-wrapper">
                        <label htmlFor="file-upload" className="file-upload-label">
                            <span className="file-upload-icon">🖼</span>
                            <span className="file-upload-text">Click to upload</span>
                        </label>
                        <input id="file-upload" type="file" className="file-upload-input" onChange={handleFileChange} accept="image/*" />
                    </div>
                    {uploadProgress > 0 && (
                        <div style={progressBarStyle.container}>
                            <div style={progressBarStyle.filler}></div>
                        </div>
                    )}
                    
                    {preview && <img src={preview} alt="Cover Preview" className="image-preview" />}
                </div>
                {formError && <div className="error-message">⚠ {formError}</div>}
                <div className="form-buttons">
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? <span className="loading-spinner"></span> : '✨ Add Book'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;