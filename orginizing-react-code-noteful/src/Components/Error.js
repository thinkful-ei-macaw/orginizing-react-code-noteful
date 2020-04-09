import React, {Component} from 'react';

export default class ErrorComp extends Component{
    state = {error: null}
    static getDerivedStateFromError(error){
        console.error(error);
        return {error};
    }
    render(){
        if(this.state.error){
            return(
                <main className="error-display">
                    <p>Error</p>
                </main>
            )
        }
        return this.props.children;
    }
}