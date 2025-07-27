






// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import './BookForm.css';

// // // Helper function to simulate a delay (for showing loading states)
// // const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// // const BookForm = ({ onBookAdded }) => {
// //   const [title, setTitle] = useState('');
// //   const [author, setAuthor] = useState('');
// //   const [coverImage, setCoverImage] = useState(null);
// //   const [preview, setPreview] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setCoverImage(file);
// //       setPreview(URL.createObjectURL(file));
// //     }
// //   };
  
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!title || !author) {
// //       setError('Please fill in both title and author.');
// //       return;
// //     }
// //     setLoading(true);
// //     setError('');
// //     const formData = new FormData();
// //     formData.append('title', title);
// //     formData.append('author', author);
// //     if (coverImage) {
// //       formData.append('coverImage', coverImage);
// //     }
// //     try {
// //       const response = await axios.post('http://localhost:5001/api/books', formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });
// //       await sleep(500);
// //       onBookAdded(response.data);
// //       setTitle('');
// //       setAuthor('');
// //       setCoverImage(null);
// //       setPreview('');
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Failed to add book. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="book-form-container">
// //       <div className="book-form-header">
// //         <span className="icon">✒️</span>
// //         <h2>Add a New Book</h2>
// //       </div>
// //       <form onSubmit={handleSubmit} noValidate>
// //         <div className="form-group">
// //           <label htmlFor="title">Title</label>
// //           <input
// //             id="title"
// //             type="text"
// //             className="form-control"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             placeholder="e.g., The Great Gatsby"
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="author">Author</label>
// //           <input
// //             id="author"
// //             type="text"
// //             className="form-control"
// //             value={author}
// //             onChange={(e) => setAuthor(e.target.value)}
// //             placeholder="e.g., F. Scott Fitzgerald"
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>Cover Image</label>
// //           <div className="file-upload-wrapper">
// //             <label htmlFor="file-upload" className="file-upload-label">
// //               <span className="file-upload-icon">🖼️</span>
// //               <span className="file-upload-text">Click or drag to upload</span>
// //             </label>
// //             <input
// //               id="file-upload"
// //               type="file"
// //               className="file-upload-input"
// //               onChange={handleFileChange}
// //               accept="image/*"
// //             />
// //           </div>
// //           {preview && (
// //             <div className="file-info">
// //               <img src={preview} alt="Cover Preview" className="image-preview" />
// //               <span className="file-name">{coverImage.name}</span>
// //             </div>
// //           )}
// //         </div>
// //         {error && <div className="error-message">⚠️ {error}</div>}
// //         <button type="submit" className="submit-btn" disabled={loading}>
// //           {loading ? <span className="loading-spinner"></span> : '✨ Add Book'}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default BookForm;















// import React, { useState, useEffect, useContext } from 'react';
// import { BookContext } from '../App'; // Assuming App.jsx is in src/

// const BookForm = () => {
//     const { addBook, updateBook, bookToEdit, setBookToEdit } = useContext(BookContext);
    
//     const [title, setTitle] = useState('');
//     const [author, setAuthor] = useState('');
//     const [coverImage, setCoverImage] = useState(null);
//     const [preview, setPreview] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [formError, setFormError] = useState('');

//     useEffect(() => {
//         if (bookToEdit) {
//             setTitle(bookToEdit.title);
//             setAuthor(bookToEdit.author);
//             setPreview(bookToEdit.coverImage ? `http://localhost:5001${bookToEdit.coverImage}` : '');
//             setCoverImage(null);
//         } else {
//             setTitle('');
//             setAuthor('');
//             setPreview('');
//             setCoverImage(null);
//         }
//     }, [bookToEdit]);

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setCoverImage(file);
//             setPreview(URL.createObjectURL(file));
//         }
//     };
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!title || !author) {
//             setFormError('Please fill in both title and author.');
//             return;
//         }
//         setLoading(true);
//         setFormError('');

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('author', author);
//         if (coverImage) {
//             formData.append('coverImage', coverImage);
//         }

//         try {
//             if (bookToEdit) {
//                 await updateBook(bookToEdit._id, formData);
//             } else {
//                 await addBook(formData);
//                 setTitle('');
//                 setAuthor('');
//                 setCoverImage(null);
//                 setPreview('');
//             }
//         } catch (err) {
//             // Error is already shown by context's toast
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCancelEdit = () => {
//         setBookToEdit(null);
//     };

//     return (
//         <div className="book-form-container">
//             <div className="book-form-header">
//                 <span className="icon">✒</span>
//                 <h2>{bookToEdit ? 'Edit Book' : 'Add a New Book'}</h2>
//             </div>
//             <form onSubmit={handleSubmit} noValidate>
//                 <div className="form-group">
//                     <label htmlFor="title">Title</label>
//                     <div className="input-with-icon">
//                         <span className="input-icon">📖</span>
//                         <input id="title" type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., The Great Gatsby" required />
//                     </div>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="author">Author</label>
//                      <div className="input-with-icon">
//                         <span className="input-icon">👤</span>
//                         <input id="author" type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g., F. Scott Fitzgerald" required />
//                     </div>
//                 </div>
//                 <div className="form-group">
//                     <label>Cover Image</label>
//                     <div className="file-upload-wrapper">
//                         <label htmlFor="file-upload" className="file-upload-label">
//                             <span className="file-upload-icon">🖼</span>
//                             <span className="file-upload-text">{bookToEdit ? 'Change Cover' : 'Click or drag to upload'}</span>
//                         </label>
//                         <input id="file-upload" type="file" className="file-upload-input" onChange={handleFileChange} accept="image/*" />
//                     </div>
//                     {preview && <img src={preview} alt="Cover Preview" className="image-preview" />}
//                 </div>
//                 {formError && <div className="error-message">⚠ {formError}</div>}
//                 <div className="form-buttons">
//                     <button type="submit" className="submit-btn" disabled={loading}>
//                         {loading ? <span className="loading-spinner"></span> : bookToEdit ? '💾 Update Book' : '✨ Add Book'}
//                     </button>
//                     {bookToEdit && (
//                         <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
//                     )}
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default BookForm;















import React, { useState, useEffect, useContext } from 'react';
import { BookContext } from '../App'; // Assuming App.jsx is in src/

const BookForm = () => {
    const { addBook, updateBook, bookToEdit, setBookToEdit, error } = useContext(BookContext);
    
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (bookToEdit) {
            setTitle(bookToEdit.title);
            setAuthor(bookToEdit.author);
            // setPreview(bookToEdit.coverImage ? `http://localhost:5001${bookToEdit.coverImage}` : '');
            setPreview(bookToEdit.coverImage || '');
            setCoverImage(null);
        } else {
            setTitle('');
            setAuthor('');
            setPreview('');
            setCoverImage(null);
        }
    }, [bookToEdit]);

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
            if (bookToEdit) {
                await updateBook(bookToEdit._id, formData);
            } else {
                await addBook(formData);
                setTitle('');
                setAuthor('');
                setCoverImage(null);
                setPreview('');
            }
        } catch (err) {
            // Error is already shown by context's toast
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setBookToEdit(null);
    };

    return (
        <div className="book-form-container">
            <div className="book-form-header">
                <span className="icon">✒</span>
                <h2>{bookToEdit ? 'Edit Book' : 'Add a New Book'}</h2>
            </div>
            
            {/* {error && <div className="error-message">⚠ {error}</div>} */}

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
                            <span className="file-upload-text">{bookToEdit ? 'Change Cover' : 'Click or drag to upload'}</span>
                        </label>
                        <input id="file-upload" type="file" className="file-upload-input" onChange={handleFileChange} accept="image/*" />
                    </div>
                    {preview && <img src={preview} alt="Cover Preview" className="image-preview" />}
                </div>
                {formError && <div className="error-message">⚠ {formError}</div>}
                <div className="form-buttons">
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? <span className="loading-spinner"></span> : bookToEdit ? '💾 Update Book' : '✨ Add Book'}
                    </button>
                    {bookToEdit && (
                        <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default BookForm;