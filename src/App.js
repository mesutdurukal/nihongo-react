import React, { useState, useEffect } from 'react';
import {refreshStats, fetchStats, fetchQuestion, fetchAnswer, IP} from './ApiHandler'
import {getStyle} from "./Style";

function Root() {
    const [stats, setStats] = useState('');
    const updateStatsCallBack = () => fetchStats().then(setStats);
    useEffect(() => {refreshStats(); updateStatsCallBack();}, []);

    const [q, setQuestion] = useState({});
    const updateQuestionCallBack = () => fetchQuestion().then(setQuestion);
    useEffect(updateQuestionCallBack, []);

    return (<div>
        <div>{stats}</div>
        <div>
            <span>pickMode: {q.pickMode}, </span>
            <span>category: {q.category}, </span>
            <span>accuracy: {q.correctlyAnswered}/{q.totalAnswered}</span>
            <div style={{ fontSize: '24px' }}>question: {q.question}</div>
        </div> <><br/></>
        <Answer updateStatsCallBack={updateStatsCallBack} nextQuestion={updateQuestionCallBack} />
        <IP/>
    </div>)
}

function Answer(props) {
    const [userInput, setInput] = useState('');
    const [correctWords, setCorrectWords] = useState('');
    const [result, setResult] = useState('');
    const [status, setStatus] = useState('');
    const [enterPressed, setEnterPressed] = useState(false);

    const resetFields = () => {
        setInput('');           // Clear the input field
        setCorrectWords('Correct answers: ');    // Clear correct words
        setResult('Result: ');          // Clear results
    };

    const updateAnswerCallBack = () => {
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

    const userInputKeyCallBack = e => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Stop form submission or any default action
            updateAnswerCallBack();props.updateStatsCallBack();
            setEnterPressed(true); // Set the flag to true when Enter is pressed
        } else if (e.key === ' ' && enterPressed) {
            e.preventDefault(); // Avoid adding a space in the input
            resetFields(); props.nextQuestion();
            setEnterPressed(false); // Reset the flag after space is pressed
        } else {
            setEnterPressed(false); // Reset the flag if any other key is pressed
        }
    };
    return (
        <div>
            <input type="text" value={userInput} onChange={e => setInput(e.target.value)} onKeyPress={userInputKeyCallBack}/>
            <button onClick={()=>{updateAnswerCallBack(); props.updateStatsCallBack();}}>Check Answer</button>
            <button onClick={() => { resetFields(); props.nextQuestion(); }}>Next Question</button>
            <div style={getStyle(result)}>{result}</div>
            <label>{correctWords}</label><><br/><br/></>
            <div>{status}</div>
        </div>
    );
}

export { Root };
