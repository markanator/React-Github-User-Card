import React from 'react';
import axios from 'axios';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';

import './App.css';

class App extends React.Component {
    state = {
        user: {}
    }

    componentDidMount() {
        axios
            .get('https://api.github.com/users/markanator')
            .then(resp => {
                console.log(resp.data)
                this.setState({user: resp.data})
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="App">
                <div className='user-wrapper'>
                    <Card className='main-card'>
                        <CardImg top src={this.state.user.avatar_url} alt="main user"/>
                        <CardBody>
                            <CardTitle>
                                <strong>{this.state.user.name}</strong>
                            </CardTitle>
                            <CardSubtitle>
                                <em>{this.state.user.location} </em>
                                </CardSubtitle >
                                <CardText>{this.state.user.bio}}</CardText>
                                <Button href={this.state.user.html_url} >Github</Button>
                                <Button>Follow!</Button>
                            </CardBody>
                        </Card>
                    </div>

                </div>
        );
    }

}

export default App;
