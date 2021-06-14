
import React from 'react';

export default Chat = () => (
    <form onSubmit={(e) => {
        e.preventDefault();
        saveMsg(e.target.elements.message.value);
        e.target.reset();
    }}>
        <div className="field has-addons">
            <div className="control is-expanded">
                <input className="input"
                    name="message"
                    type="text"
                    placeholder="Type your message" />
            </div>
            <div className="control">
                <button className="button is-info">
                    Send Message
                </button>
            </div>
        </div>
    </form>
);