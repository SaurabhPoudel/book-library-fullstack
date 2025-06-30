
package com.example.booklibrary.service;

import com.example.booklibrary.entity.Book;
import com.example.booklibrary.repository.BookRepository;
import com.example.booklibrary.service.impl.BookServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookServiceImpl bookService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllBooks() {
        when(bookRepository.findAll()).thenReturn(Arrays.asList(new Book(), new Book()));
        assertEquals(2, bookService.getAllBooks().size());
    }

    @Test
    void testGetBookById() {
        Book book = new Book(1L, "Title", "Author", "ISBN");
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
        assertEquals("Title", bookService.getBookById(1L).getTitle());
    }

    @Test
    void testSaveBook() {
        Book book = new Book(null, "Title", "Author", "ISBN");
        when(bookRepository.save(book)).thenReturn(book);
        assertEquals("Title", bookService.saveBook(book).getTitle());
    }

    @Test
    void testDeleteBook() {
        bookService.deleteBook(1L);
        verify(bookRepository, times(1)).deleteById(1L);
    }
}
