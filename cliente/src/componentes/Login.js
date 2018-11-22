import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    login(e){
        fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/jason',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.status) {
                window.M.toast({html: data.status});
            } else {
                this.props.auth.setSession(data.token);
                this.props.history.push("/");
            }
        })
        .catch(error => console.log(error));
        e.preventDefault();
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <h1>Bienvenidos!</h1>
                        <form onSubmit={this.login}>
                            <input name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="username" />
                            <input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="password" />

                            <button type="submit" className="btn light-blue darken-4">Iniciar</button>
                            <Link to={'/register'} className="btn light-blue darken-4 right">Registrarse</Link>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Login;