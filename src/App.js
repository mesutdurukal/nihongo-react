import React, { useState, useEffect } from 'react';

const hostIp = "https://d092-2407-c800-1f32-875-4959-f8e7-57c5-c9f1.ngrok-free.app/"; // Make sure this is correct and reachable
const requestOptions = {
    method: "GET",
    headers: new Headers({"ngrok-skip-browser-warning": "test"}),
    redirect: "follow"
};

function getStats(){
    return fetch(hostIp + 'getStats', requestOptions)
        .then(response => response.json())
        .then(data => {
            let results = "";
            const order = ["vocabularySize", "globalSuccessRate", "trueInARowRecord"];
            order.forEach(key => {
                if (data[key] !== undefined) {
                    results += `${key}: ${data[key]}, `;
                }
            });
            return results;
        })
        .catch(error => console.error('Error fetching stats:', error));
}

function Stats() {
    const [stats, setStats] = useState('');
    useEffect(() => {getStats().then(setStats)}, []);
    return <div> {stats}</div>

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
        <>
            <div>
                {["pickMode", "category"].map(key => (
                    <span key={key}>{key}: {data[key]}, </span>
                ))}
                <span>accuracy: {data.correctlyAnswered}/{data.totalAnswered}</span>
            </div>
            <div style={{ fontSize: '24px' }}>
                question: {data.question}
            </div>
        </>
    );
}

function Answer() {
    const [userinput, setInput] = useState('');
    const [correctWords, setCorrectWords] = useState('');
    const [result, setResult] = useState('');
    const [status, setStatus] = useState('');

    const getAnswer = () => {
        fetch(`${hostIp}getAnswer?input=${encodeURIComponent(userinput)}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setCorrectWords(data.correctWords);
                setResult(`Result: ${data.status}`);
                const statusKeys = ["trueInRow", "currentCorrect", "currentAnswered", "currentSuccess","note"];
                let results = "";
                statusKeys.forEach(key => {
                    if (data[key] !== undefined) {
                        results += `${key}: ${data[key]}`;
                    }
                });
                setStatus(results);
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
            <button >Next Question</button>
            <div>{result}</div>
            <label>{correctWords}</label>
            <div>
                {status}
            </div>
        </div>
    );
}

export { Stats, Question, Answer };
