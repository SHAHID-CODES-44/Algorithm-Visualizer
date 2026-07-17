import { Link } from "react-router-dom";
import TowerOfHanoi from "../visualizers/TowerOfHanoi";
import BubbleSort from "../visualizers/BubbleSort";

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