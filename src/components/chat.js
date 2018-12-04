import React from "react";
import io from "socket.io-client";
import {API_BASE_URL_SOCKET} from './../config';

import './chat.css';

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io(API_BASE_URL_SOCKET);

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            if(this.state.messages.length <10){
                this.setState({messages: [...this.state.messages, data]});
            }else{
                const tempMessages = this.state.messages
                let newMessages = tempMessages.slice(1,10)
                newMessages.push(data)
                this.setState({
                    messages: newMessages
                })
            }
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.props.username,
                message: this.state.message
            })
            this.setState({message: ''});

        }
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">CS Cards Live Chat</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map((message, index) => {
                                        return (
                                            <div key={index}>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <form onSubmit={this.sendMessage} className="card-footer">
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button  className="btn btn-primary form-control">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;