// frontend/src/components/BookForm.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import BookForm from './BookForm';

jest.mock('axios');

describe('BookForm', () => {
  it('should allow a user to fill out the form and upload an image', async () => {
    const mockOnBookAdded = jest.fn();
    render(<BookForm onBookAdded={mockOnBookAdded} />);
    
    // Create a mock file
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    // Fill out text inputs
    userEvent.type(screen.getByLabelText(/title/i), 'A Cool Book');
    userEvent.type(screen.getByLabelText(/author/i), 'An Awesome Author');
    
    // Select the file
    const fileInput = screen.getByLabelText(/cover image/i);
    userEvent.upload(fileInput, file);

    // Check for preview
    expect(screen.getByAltText(/cover preview/i)).toBeInTheDocument();

    // Mock the API response
    axios.post.mockResolvedValue({ data: { _id: '123', title: 'A Cool Book' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for the submission to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(mockOnBookAdded).toHaveBeenCalledWith({ _id: '123', title: 'A Cool Book' });
    });
  });
});
