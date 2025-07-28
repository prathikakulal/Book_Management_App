import React, { useContext } from "react";
import { ToastProvider } from './context/ToastContext';
import { BookProvider, BookContext } from './context/BookContext';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import ToastContainer from './components/ToastContainer';
import Confetti from './components/Confetti';
import './App.css';
import './components/BookForm.css';
import './components/BookList.css';

const MainAppContent = () => {
  const { showConfetti } = useContext(BookContext);

  return (
    <div className="app-bg">
      <Confetti show={showConfetti} />
      <ToastContainer />
      <header className="app-header">
        <h1>BookStack Pro</h1>
      </header>
      <main className="centered-main">
        <div className="center-stack">
          <BookForm />
          <BookList />
        </div>
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} BookStack Pro. Built with professional standards.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <BookProvider>
        <MainAppContent />
      </BookProvider>
    </ToastProvider>
  );
}

export default App;
