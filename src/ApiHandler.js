import React, { useState } from 'react';
let hostIp = "https://5625-2407-c800-1f32-875-cc05-3d26-55e3-32f.ngrok-free.app/"; // Make sure this is correct and reachable
const requestOptions = {
    method: "GET",
    headers: new Headers({"ngrok-skip-browser-warning": "test"}),
    redirect: "follow"
};

function refreshStats(){
    return fetch(hostIp + 'refreshStats', requestOptions)
        .then(response => response.json())
        .catch(error => console.error('Error refreshing stats:', error));
}

function fetchStats(){
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

function fetchQuestion (){
    return fetch(hostIp + 'getQuestion', requestOptions)
    .then(response => response.json())
    .catch(error => {
        console.error('Failed to fetch data:', error);
        return('Failed to fetch data');
    });
};

function fetchAnswer(userInput){
    return fetch(`${hostIp}getAnswer?input=${encodeURIComponent(userInput)}`, requestOptions)
        .then(response => response.json())
        .then(data => {
           const statusKeys = ["trueInRow", "currentCorrect", "currentAnswered", "currentSuccess","note"];
           let results = "";
           statusKeys.forEach(key => {
               if (data[key] !== undefined) {
                   results += `${key}: ${data[key]}, `;
               }
           });
           data.results = results;
           return data;
        })
        .catch(error => {
           console.error('Error:', error);
           return "ERROR";
        });
}

function IP() {
    const [ip, setIp] = useState(hostIp);  // Initialize the state with hostIp
    const handleInputChange = (event) => {setIp(event.target.value); };
    return (
        <>
            <input type="text" value={ip} onChange={handleInputChange} placeholder="Enter server IP"/>
            <button onClick={()=>{hostIp = ip;}}>Set Server IP</button>
            <button onClick={refreshStats}>Reset Local Stats</button><><br/></>
            <label id="iplabel" style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}>{ip}</label>
        </>
    );
}

export {refreshStats, fetchStats, fetchAnswer, fetchQuestion, IP }