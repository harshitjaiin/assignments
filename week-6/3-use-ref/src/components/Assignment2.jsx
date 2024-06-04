import React, { useState, useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [count , setCount] = useState(0);
    
    //But this is wrong kyuki isme 2 re-render ho raha hai everytime handleReRender is called
    //as maine 2 state variables change kie! to 2 bar re-render hoga
    //mtlb ye soltion glt hai!
    
    // const [render , setRender] = useState(0);
    const handleReRender = () => {
        // Update state to force re-render
        setCount(count+1);
        // setRender(render+1);
    };


    //Other thing you can do is have a global count = 0;
    //and update it every time it re-renders!
    //But global values are not preferred and should be avoided!!
    
    //<---------------------------------I M P ---------------------------------------------->
    //Now basically we want ki our count value should be retained
    //across re-renders!!
    //and useRef can also be used for this usecase too!
    let render = useRef(0);

    render.current  = render.current+1;

    return (
        <div>
            <p>This component has rendered {render.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};