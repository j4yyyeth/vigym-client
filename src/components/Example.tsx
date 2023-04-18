import { useState } from "react";

type ExampleProps = {
    name: string
    age: number
    year: number
}

const Example = (props: ExampleProps) => {

    const [ loggedIn, setLoggedIn ] = useState(false);

    const login = () => {
        setLoggedIn(true)
    }

  return (
    <div>
        <h2>Greeting {props.name}</h2>
        <h2>Your age is {props.age} and year is {props.year}</h2>
       {loggedIn
            ? <h1>Welcome User</h1>
            : <button onClick={login}>Login</button>
        } 
    </div>
  )
}

export default Example;
