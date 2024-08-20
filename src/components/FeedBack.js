import React, { useState } from 'react';

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = () => {
        // Placeholder function to handle form submission
        // You can replace this with your own logic to handle the feedback data
        console.log('Submitting feedback:', { name, email, text });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Feedback:
                    <textarea value={text} onChange={(e) => setText(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FeedbackForm;