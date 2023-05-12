// PascalCasing
function Message() {
    // convert to JavaScript XML
    const name = 'Ania';
    if(name){
        return <h1>Hello {name}</h1>
    }
    return <h1>Hello who?</h1>
}

// export so we can use it somewhere else in the React App
export default Message;