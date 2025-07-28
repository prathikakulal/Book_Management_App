import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import BookForm from './BookForm';

jest.mock('axios');

describe('BookForm', () => {
  it('should allow a user to fill out the form and upload an image', async () => {
    const mockOnBookAdded = jest.fn();
    render(<BookForm onBookAdded={mockOnBookAdded} />);
    
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    userEvent.type(screen.getByLabelText(/title/i), 'A Cool Book');
    userEvent.type(screen.getByLabelText(/author/i), 'An Awesome Author');
    
    const fileInput = screen.getByLabelText(/cover image/i);
    userEvent.upload(fileInput, file);

    expect(screen.getByAltText(/cover preview/i)).toBeInTheDocument();

    axios.post.mockResolvedValue({ data: { _id: '123', title: 'A Cool Book' } });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(mockOnBookAdded).toHaveBeenCalledWith({ _id: '123', title: 'A Cool Book' });
    });
  });
});
