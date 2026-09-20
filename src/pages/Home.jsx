import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Ensure to import the stylesheet

const Home = () => {
    const visualizerList = [
        {
            title: "Recursion",
            description: "Visualize recursive patterns and problem-solving using the Tower of Hanoi.",
            path: "/Recursion",
            tag: "Tower of Hanoi",
        },
        {
            title: "Sorting Algorithms",
            description: "Watch step-by-step visualizations of Bubble Sort, Merge Sort, Quick Sort, and more.",
            path: "/Sorts",
            tag: "Sorting",
        },
    ];

    return (
        <div className="home-container">
            <header className="home-header">
                <h1 className="home-title">Algorithm Visualizer</h1>
                <p className="home-subtitle">
                    Explore and interact with complex algorithms through dynamic, step-by-step visual representations.
                </p>
            </header>

            <main className="home-grid">
                {visualizerList.map((item, index) => (
                    <div className="card" key={index}>
                        <div className="card-header">
                            <span className="card-tag">{item.tag}</span>
                            <h2>{item.title}</h2>
                        </div>
                        <p className="card-description">{item.description}</p>
                        <Link to={item.path} className="card-button">
                            Explore &rarr;
                        </Link>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Home;