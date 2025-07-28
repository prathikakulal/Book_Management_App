
import React, { useState, useEffect, useContext } from 'react';
import { BookContext } from "../context/BookContext";

const BookCardSkeleton = () => (
    <div className="book-card-skeleton">
        <div className="skeleton skeleton-image"></div>
        <div className="skeleton-info">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text skeleton-text-short"></div>
        </div>
    </div>
);

const BookList = () => {
    const { books, loading } = useContext(BookContext);
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const renderEmptyState = () => (
        <div className="empty-state">
            <svg className="empty-state-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 5.25a.75.75 0 00-1.5 0v1.5H12a.75.75 0 000 1.5h6.5V18a2.25 2.25 0 01-2.25 2.25H8.75a2.25 2.25 0 01-2.25-2.25V8.5h4.75a.75.75 0 000-1.5H6.5V6.75a2.25 2.25 0 012.25-2.25h8.5V3a.75.75 0 00-1.5 0v1.5h-8.5A3.75 3.75 0 003.5 8.25V18A3.75 3.75 0 007.25 21.75h9.5A3.75 3.75 0 0020.5 18V5.25z"></path></svg>
            <h3>{searchQuery ? 'No Books Found' : 'Your Library is Empty'}</h3>
            <p>{searchQuery ? 'Try a different search term.' : 'Add your first book to get started!'}</p>
        </div>
    );

    return (
        <div className="book-list-container">
            <div className="list-controls">
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input 
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="view-toggle">
                    <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')} title="Grid View">
                        <svg viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8z"></path></svg>
                    </button>
                    <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')} title="List View">
                        <svg viewBox="0 0 24 24"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path></svg>
                    </button>
                </div>
            </div>
            <h2 className="book-list-header">Your Collection</h2>
            <div className={`books-display ${viewMode}`}>
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => <BookCardSkeleton key={index} />)
                ) : filteredBooks.length === 0 ? (
                    renderEmptyState()
                ) : (
                    filteredBooks.map((book) => (
                        <div key={book._id} className="book-card">
                            <div className="book-cover-wrapper">
                                {book.coverImage ? (
                                    <img src={book.coverImage} alt={`${book.title} cover`} className="book-cover" />
                                ) : (
                                    <div className="default-cover aspect-ratio-box">📖</div>
                                )}
                            </div>
                            <div className="book-info">
                                <h3 className="book-title" title={book.title}>{book.title}</h3>
                                <p className="book-author">by {book.author}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BookList;