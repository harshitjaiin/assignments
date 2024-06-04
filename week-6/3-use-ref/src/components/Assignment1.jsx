import { useEffect , useRef } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
    const ele = useRef();

    //doc.getLement by id krne de better 
    //useRef use krle!
    useEffect(() => {
        ele.current.focus();
    }, []);
    
    function handleButtonClick(){
        ele.current.focus(); 
    }

    return (
        <div>
            <input ref={ele} type="text" placeholder="Enter text here" />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};
