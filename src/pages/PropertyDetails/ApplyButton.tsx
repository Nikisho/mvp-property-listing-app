import React from "react";

function clickMe(){
    alert('You clicked me!');
}

export default function ApplyButton(){
    return(
        <div className = 'grid bg-blue-400 rounded-xl p-3 font-bold'>
            <button onClick={clickMe}>
                Apply to Property
            </button>
        </div>
    )
}