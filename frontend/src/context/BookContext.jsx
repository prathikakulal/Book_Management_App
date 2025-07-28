import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useToast } from "./ToastContext";

const API_URL = `${import.meta.env.VITE_API_URL}/api/books`;

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { showToast } = useToast ? useToast() : { showToast: () => {} };

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_URL);
            setBooks(res.data);
        } catch (err) {
            showToast?.("Failed to fetch books", "error");
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const addBook = async (formData) => {
        setUploadProgress(0);
        try {
            const config = {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                },
            };
            await axios.post(API_URL, formData, config);
            
            await fetchBooks();
            showToast?.("Book added!", "success");
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 1500);
            setTimeout(() => setUploadProgress(0), 1000);

        } catch {
            showToast?.("Failed to add book", "error");
            setUploadProgress(0); 
            throw new Error("Add failed");
        }
    };

    return (
        <BookContext.Provider
            value={{
                books,
                loading,
                addBook,
                showConfetti,
                uploadProgress, 
            }}
        >
            {children}
        </BookContext.Provider>
    );
};