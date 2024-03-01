import { useNavigate } from 'react-router-dom';

function LandingPage() {

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataJson = Object.fromEntries(formData);
        console.log(dataJson)

        const loginResponse = await fetch('http://localhost:3300/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(dataJson)
        });

        const data = await loginResponse.json();
        const user = data.user;

        console.log(user)

        if (!!user.auth_enabled) {
            navigate('/2FA');
        }
    }
    return <>
        <h1>Login</h1>
        <form method="post" onSubmit={handleSubmit}>
            <label>
                Email : <input name="mail"></input>
            </label>
            <hr/>
            <label>
                Password : <input name="password" type="password"></input>
            </label>
            <br/>
            <button type="submit">Login</button>
        </form>
    </>
}

export default LandingPage;