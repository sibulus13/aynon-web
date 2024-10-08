import React from 'react';

const FeedbackForm = ({ send, name, email, content, setName, setEmail, setContent }) => {
    return (
        <div>
            <form onSubmit={send}>
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
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FeedbackForm;