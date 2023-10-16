import axios from 'axios';
import { React, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// resetPassword
const PasswordReset = () => {
    const params = useParams();
    useEffect(() => {
        console.log(params);
        const token = `${params.a}.${params.b}.${params.c}`; 
        console.log(token);
        axios.get(`https://abxsolutions.ca/api/validateResetToken/${params.a}/${params.b}/${params.c}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>PasswordReset</div>
    )
}

export default PasswordReset