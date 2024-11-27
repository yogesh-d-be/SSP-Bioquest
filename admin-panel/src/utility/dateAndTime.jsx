import React from "react";

const FormatDate = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('en-IN',{
        day:'2-digit',
        month:'2-digit',
        year:'numeric'
    });

    return formattedDate;
};


export default FormatDate;