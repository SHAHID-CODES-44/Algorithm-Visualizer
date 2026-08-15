import { Link } from "react-router-dom";
import TowerOfHanoi from "../visualizers/Recursion";
import Sorts from "../visualizers/Sorts";

const Home = () => {
    return (
        <div className="home-main-container">
            <h1>Checkout Our Visualizers</h1>
            <br />
           <Link to="/Recursion">Recursion</Link>
           <br />
           <br />
           <Link to="/Sorts">Sorts</Link>
        </div>
    );
};

export default Home;