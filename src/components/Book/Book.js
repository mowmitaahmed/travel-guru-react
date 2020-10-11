import React from 'react';
import BookingArea from '../BookingArea/BookingArea';
import Header from '../Header/Header';
import './Book.css';

const Book = () => {
    return (
        <div className="App homePage">
            <div id="color-overlay">
            </div>
            <Header></Header>
            <BookingArea></BookingArea>
        </div>
    );
};

export default Book;