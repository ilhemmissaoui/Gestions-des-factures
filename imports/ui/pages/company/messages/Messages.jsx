import React, { useState } from 'react';
import MessageItem from './message';
import Chat from './Chat';

const Messages = () => {


    const [chat, setChat] = useState(['hello', 'hi!', 'do you want to chat?']);

    return <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
            <div className="column">
                <section className="hero is-fullheight">
                    <div className="hero-head">
                        <header className="hero is-link is-bold">
                            <div className="hero-body">
                                <div className="container">
                                    <p className="title">
                                        Chat Messenger
                                    </p>
                                </div>
                            </div>
                        </header>
                    </div>

                    <div className="hero-body">
                        <MessageItem chat={chat} />
                    </div>

                    <div className="hero-foot">
                        <footer className="section is-small">
                            <Chat />
                        </footer>
                    </div>
                </section>
            </div>
        </div>
    </div>
}

export default Messages;