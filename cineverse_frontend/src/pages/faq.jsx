import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import '../style/faq.css';

const FAQ = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [expandedIndex, setExpandedIndex] = useState(null);

    const faqData = {
        general: [
            {
                question: "Do I need to create an account to book tickets?",
                answer: "Yes, creating an account allows you to manage your bookings, receive updates, and access special offers."
            },
            {
                question: "How can I reset my password?",
                answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page."
            },
            {
                question: "Can I delete my account?",
                answer: "Yes, you can delete your account by contacting our support team."
            }
        ],
        bookingTicket: [
            {
                question: "How do I book a ticket?",
                answer: "You can book a ticket by selecting your preferred movie, showtime, and seats, then proceeding to checkout."
            },
            {
                question: "Can I change my seat after booking?",
                answer: "Unfortunately, you cannot change your seat after booking. Please ensure your selection is correct before confirming your booking."
            }
        ],
        technicalIssues: [
            {
                question: "I am having trouble logging in. What should I do?",
                answer: "Please make sure your email and password are correct. If you have forgotten your password, use the 'Forgot Password' link to reset it."
            },
            {
                question: "The website is not loading properly. What can I do?",
                answer: "Try clearing your browser's cache and cookies, or use a different browser. If the problem persists, contact our support team."
            }
        ]
    };

    const handleExpand = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <div className="faq-container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-content">
                <div className="faq-sidebar">
                    <button
                        className={`faq-sidebar-button ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('general'); setExpandedIndex(null); }}
                    >
                        General
                    </button>
                    <button
                        className={`faq-sidebar-button ${activeTab === 'bookingTicket' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('bookingTicket'); setExpandedIndex(null); }}
                    >
                        Booking Ticket
                    </button>
                    <button
                        className={`faq-sidebar-button ${activeTab === 'technicalIssues' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('technicalIssues'); setExpandedIndex(null); }}
                    >
                        Technical Issues
                    </button>
                </div>
                <div className="faq-details">
                    {faqData[activeTab].map((faq, index) => (
                        <div key={index} className="faq-item">
                            <div className="faq-question" onClick={() => handleExpand(index)}>
                                <h4>{faq.question}</h4>
                                <span>{expandedIndex === index ? <FaMinus /> : <FaPlus />}</span>
                            </div>
                            <div
                                className={`faq-answer ${expandedIndex === index ? 'expanded' : 'collapsed'}`}
                            >
                                {faq.answer}
                            </div>
                            {index < faqData[activeTab].length - 1 && <hr />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
