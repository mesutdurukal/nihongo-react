const getStyle = (result)=>{
    let c;
    if (result.includes('true') )
        c = 'green';
    else if (result.includes('false') )
        c = 'red';
    else
        c = 'black';
    return {
        color: c,
        fontSize: '20px'
    };
}

export {getStyle};