import { Link } from "react-router-dom";
import TowerOfHanoi from "../Visualizers/TowerOfHanoi";
import BubbleSort from "../Visualizers/BubbleSort";

const Home = () => {
    return (
        <div className="home-main-container">
            <h1>Checkout Our Visualizers</h1>
            <br />
           <Link to="/TowerOfHanoi">Tower Of Hanoi</Link>
           <br />
           <br />
           <Link to="/BubbleSort">Bubble Sort</Link>
        </div>
    );
};

export default Home;