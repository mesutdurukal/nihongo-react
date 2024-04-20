import React, { useState, useEffect } from 'react';
let hostIp = "https://621b-2407-c800-1f32-875-4cf3-6a6a-22ec-69d.ngrok-free.app/"; // Make sure this is correct and reachable
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

    const handleInputChange = (event) => {
        setIp(event.target.value); // This will update the state with the value from the input field
    };

    const setNewIp = () => {
        hostIp = ip;
        console.log("IP set to:", ip); // Optional: for debug purposes
    };

    return (
        <>
            <input
                type="text"
                value={ip}
                onChange={handleInputChange} // Handles input changes
                placeholder="Enter server IP"
            />
            <button onClick={setNewIp}>Set Server IP</button><><br/></>
            <label id="iplabel" style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}>
                Current IP: {ip}
            </label>
        </>
    );
}



export {getStats, fetchAnswer, fetchQuestion, IP }