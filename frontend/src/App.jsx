


// import React, { useState } from 'react';
// import BookForm from './components/BookForm';
// import BookList from './components/BookList';
// import './App.css';

// function App() {
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [listError, setListError] = useState('');

//   const handleBookAdded = () => {
//     // When a book is added, clear any previous errors and refresh the list
//     setListError('');
//     setRefreshKey(prevKey => prevKey + 1);
//   };

//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <h1>📚 BookStack</h1>
//       </header>

//       <main className="app-main">
//         {/* The 'force-single-column' class is added dynamically when an error occurs */}
//         <div className={`content-wrapper ${listError ? 'force-single-column' : ''}`}>
//           <section className="form-section">
//             <BookForm onBookAdded={handleBookAdded} />
//           </section>
          
//           <section className="list-section">
//             {listError ? (
//               // If there's an error, display it here
//               <div className="status-message list-error-display">⚠️ {listError}</div>
//             ) : (
//               // Otherwise, display the book list
//               <BookList key={refreshKey} onError={setListError} />
//             )}
//           </section>
//         </div>
//       </main>

//       <footer className="app-footer">
//         <p>© {new Date().getFullYear()} BookStack. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;







































import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css'; // Global styles
import './components/BookForm.css'; // Form styles
import './components/BookList.css'; // List styles

// --- API Service Layer ---
const API_URL = 'http://localhost:5001/api/books';
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const bookService = {
    getAllBooks: async () => {
        await sleep(1000); // Simulate network delay
        const response = await axios.get(API_URL);
        return response.data;
    },
    createBook: (formData) => {
        return axios.post(API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    updateBook: (id, formData) => {
        return axios.put(`${API_URL}/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    deleteBook: (id) => {
        return axios.delete(`${API_URL}/${id}`);
    }
};

// --- Reusable UI Components ---

const Toast = ({ id, message, type, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if(onDismiss) onDismiss(id);
        }, 3000);
        return () => clearTimeout(timer);
    }, [id, onDismiss]);

    return <div className={`toast ${type}`}>{message}</div>;
};

export const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">{children}</div>
                <div className="modal-footer">
                    <button className="modal-btn modal-btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="modal-btn modal-btn-confirm" onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

const ConfettiPiece = ({ x, y, angle, size, opacity, color }) => (
    <div
        style={{
            position: 'absolute', left: `${x}px`, top: `${y}px`, width: `${size}px`,
            height: `${size}px`, backgroundColor: color, opacity,
            transform: `rotate(${angle}deg)`,
            transition: 'top 1s ease-out, opacity 1s ease-out',
        }}
    />
);

const Confetti = ({ show }) => {
    const [pieces, setPieces] = useState([]);
    useEffect(() => {
        if (show) {
            const newPieces = Array.from({ length: 150 }).map(() => ({
                id: Math.random(), x: Math.random() * window.innerWidth, y: -20,
                angle: Math.random() * 360, size: Math.random() * 8 + 4, opacity: 1,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            }));
            setPieces(newPieces);
            setTimeout(() => {
                setPieces(current => current.map(p => ({ ...p, y: window.innerHeight + 20, opacity: 0 })));
            }, 100);
            setTimeout(() => setPieces([]), 1100);
        }
    }, [show]);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
            {pieces.map(p => <ConfettiPiece key={p.id} {...p} />)}
        </div>
    );
};

// --- Contexts ---
export const BookContext = createContext();
const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);


// --- Providers ---
const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [bookToEdit, setBookToEdit] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);

    const showToast = useCallback((message, type = 'success') => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);
    }, []);
    
    const dismissToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await bookService.getAllBooks();
            setBooks(data);
        } catch (err) {
            const errorMsg = 'Failed to fetch books. Is the server running?';
            setError(errorMsg);
            showToast(errorMsg, 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const addBook = async (bookData) => {
        await sleep(500);
        try {
            await bookService.createBook(bookData);
            await fetchBooks();
            showToast('Book added successfully!', 'success');
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);
        } catch (err) {
            showToast('Failed to add book.', 'error');
            throw err;
        }
    };

    const updateBook = async (id, bookData) => {
        await sleep(500);
        try {
            await bookService.updateBook(id, bookData);
            await fetchBooks();
            setBookToEdit(null);
            showToast('Book updated successfully!', 'success');
        } catch (err) {
            showToast('Failed to update book.', 'error');
            throw err;
        }
    };

    const deleteBook = async (id) => {
        await sleep(500);
        try {
            await bookService.deleteBook(id);
            await fetchBooks();
            showToast('Book deleted successfully!', 'success');
        } catch (err) {
            showToast('Failed to delete book.', 'error');
        }
    };

    const value = { books, loading, error, addBook, deleteBook, updateBook, bookToEdit, setBookToEdit, showConfetti };

    return (
        <BookContext.Provider value={value}>
            <ToastContext.Provider value={{ toasts, dismissToast }}>
                {children}
            </ToastContext.Provider>
        </BookContext.Provider>
    );
};

const ToastContainer = () => {
    const { toasts, dismissToast } = useToast();
    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onDismiss={dismissToast} />
            ))}
        </div>
    );
};


// --- App Layout ---
function App() {
    const { showConfetti } = useContext(BookContext);
    return (
        <div className="app-container">
            <Confetti show={showConfetti} />
            <ToastContainer />
            <header className="app-header">
                <h1>📚 BookStack Pro</h1>
            </header>
            <main className="app-main">
                <div className="content-wrapper">
                    <section className="form-section">
                        <BookForm />
                    </section>
                    <section className="list-section">
                        <BookList />
                    </section>
                </div>
            </main>
            <footer className="app-footer">
                <p>© {new Date().getFullYear()} BookStack Pro. Built with professional standards.</p>
            </footer>
        </div>
    );
}

// --- Root Component (New Entry Point) ---
const Root = () => {
    return (
        <BookProvider>
            <App />
        </BookProvider>
    );
};

export default Root;