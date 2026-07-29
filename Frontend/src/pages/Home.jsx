import { Link } from "react-router-dom";

function Home() {
    return(
        <>
            <h1>Home Pages</h1>
            
            <Link to="/login">Login</Link>
            <br />

            <Link to="/register">Register</Link>
            <br />

            <Link to="/todos">Todos</Link>
        </>
    );
}

export default Home;