import React, { useState, useEffect } from 'react';
import {getStats, fetchQuestion, fetchAnswer} from './ApiHandler'

function Stats() {
    const [stats, setStats] = useState('');
    useEffect(() => {getStats().then(setStats)}, []);
    return <div> {stats}</div>
}

function Answer({ fetchQuestion }) {
    const [userInput, setInput] = useState('');
    const [correctWords, setCorrectWords] = useState('');
    const [result, setResult] = useState('');
    const [status, setStatus] = useState('');

    const resetFields = () => {
        setInput('');           // Clear the input field
        setCorrectWords('Correct answers: ');    // Clear correct words
        setResult('Result: ');          // Clear results
    };

    const getAnswer = () => {
        fetchAnswer(userInput).then(data => {
            setCorrectWords("Correct answers: " + data.correctWords);
            setResult(`Result: ${data.status}`);
            setStatus(data.results);
        })
        .catch(error => {
            console.error('Error:', error);
            setResult("ERROR");
        });
    };
    let c;
    if (result.includes('true') )
        c = 'green';
    else if (result.includes('false') )
        c = 'red';
    else
        c = 'black';
    const resultStyle = {
        color: c,
        fontSize: '20px'
    };
    return (
        <div>
            <input
                type="text"
                value={userInput}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && getAnswer()}
            />
            <button onClick={getAnswer}>Check Answer</button>
            <button onClick={() => { resetFields(); fetchQuestion(); }}>Next Question</button>

            <div style={resultStyle}>{result}</div>
            <label>{correctWords}</label><><br/><br/></>
            <div>{status}</div>
        </div>
    );
}

function QA() {
    const [data, setData] = useState({});
    const handleFetchQuestion = () => fetchQuestion().then(setData);
    useEffect(() => handleFetchQuestion(), []);

    return (
        <div>
            <div>
                <span>pickMode: {data.pickMode}, </span>
                <span>category: {data.category}, </span>
                <span>accuracy: {data.correctlyAnswered}/{data.totalAnswered}</span>
                <div style={{ fontSize: '24px' }}>question: {data.question}</div>
            </div> <><br/></>
            <Answer fetchQuestion={handleFetchQuestion} />
        </div>
    );
}

export { Stats, QA };
