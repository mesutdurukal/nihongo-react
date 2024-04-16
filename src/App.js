import React, { useState, useEffect } from 'react';

const hostIp = "http://localhost:8080/"; // Make sure this is correct and reachable
const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    redirect: "follow"
};

function Stats() {
    const [stats, setStats] = useState('');

    useEffect(() => {
        fetch(hostIp + 'getStats', requestOptions)
            .then(response => response.json())
            .then(data => {
                let results = [];
                const order = ["vocabularySize", "globalSuccessRate", "trueInARowRecord"];
                order.forEach(key => {
                    if (data[key] !== undefined) {
                        results.push(`${key}: ${data[key]}`);
                    }
                });
                setStats(results.join(', '));
            })
            .catch(error => console.error('Error fetching stats:', error));
    }, []);

    return <div>{stats}</div>;
}

function Question() {
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchQuestion = () => {
        setIsLoading(true);
        fetch(hostIp + 'getQuestion', requestOptions)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError('Failed to fetch data');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchQuestion();
    }, []); // Empty dependency array ensures this runs only once on mount

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div>
                {["trueInRow", "currentCorrect", "currentAnswered", "currentSuccess"].map(key => (
                    <span key={key}>{key}: {data[key]}, </span>
                ))}
            </div>
            <div>
                {["pickMode", "category"].map(key => (
                    <span key={key}>{key}: {data[key]}, </span>
                ))}
                <span>accuracy: {data.correctlyAnswered}/{data.totalAnswered}</span>
            </div>
            <div style={{ fontSize: '24px' }}>
                question: {data.question}<button onClick={fetchQuestion}>Next Question</button>
            </div>

        </div>
    );
}

function Answer() {
    const [userinput, setInput] = useState('');
    const [result, setResult] = useState('');
    const [status, setStatus] = useState('');

    const getAnswer = () => {
        fetch(`${hostIp}getAnswer?input=${encodeURIComponent(userinput)}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setResult(data.correctWords);
                setStatus(`Status: ${data.status}`);
                // Additional UI logic or state updates can go here
            })
            .catch(error => {
                console.error('Error:', error);
                setResult("ERROR");
            });
    };

    return (
        <div>
            <input
                type="text"
                value={userinput}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && getAnswer()}
            />
            <button onClick={getAnswer}>Check Answer</button>

            <div>{status}</div>
            <label>{result}</label>
        </div>
    );
}

export { Stats, Question, Answer };
