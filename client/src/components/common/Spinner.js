import React from 'react';

const Spinner = () => {
    return (<div style={{textAlign:'center', margin: '20px 0'}}>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>)
}

export default Spinner
