import React from 'react';
import axios from 'axios';
import {Card,CardBody,CardFooter,
        CardImg,CardTitle,CardSubtitle,CardText,ButtonGroup,
        Button, Row, Col, Form, Label, Input} from 'reactstrap';

import './App.css';

class App extends React.Component {
    state = {
        isLoading: true,
        username: 'markanator',
        user: {},
        followers: []
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = (e)=>{
        this.setState({isLoading:true});
        axios.get(`https://api.github.com/users/${this.state.username}`)
            .then(resp => {
                //console.log(resp.data)
                this.setState({user: resp.data})
                this.setState({isLoading:false});
            })
            .catch(err => {
                console.log(err)
                this.setState({isLoading:false});
            });

        axios.get(`https://api.github.com/users/${this.state.username}/followers`)
            .then((resp) => {
                //console.log(resp.data);
                this.setState({followers: resp.data})
                this.setState({isLoading:false});
            })
            .catch(err => {
                console.log(err)
                this.setState({isLoading:false});
            });
    }

    handleChange = e =>{
        e.preventDefault();
        this.setState({username: e.target.value.toLowerCase()})
    }

    render() {
        
        return (
            <div className="App">
                <Card className='user-wrapper'>
                    <Form onSubmit={e=>{
                        e.preventDefault();
                        this.fetchData();
                    }}>
                        <Label>Enter Github Username:
                            <Input
                                name='username'
                                value={this.state.username}
                                onChange={this.handleChange}
                                />
                        </Label><br/>
                        <Button color='primary' type="submit" block>Lookup!</Button>
                    </Form>
                </Card>
                <div className='user-wrapper'>
                    {/* Main Users Card */}
                    <Card className='main-card'>
                        
                        <CardImg
                            style={{height:'140'}}
                            src={`${this.state.user.avatar_url}`}
                            alt="main user"
                            title='main user'/>
                        <CardBody>
                            <CardTitle tag='h2'>
                                { this.state.user?.name ? <strong>{this.state.user.name}</strong> : <strong>Loading...</strong> }
                            </CardTitle>
                            <CardSubtitle>
                                { this.state.user?.location ? <em>{this.state.user.location}</em>: <strong>Loading...</strong> }
                            </CardSubtitle >
                            <CardText>
                                { this.state.user?.bio ? <em>{this.state.user.bio}</em>: <strong>Loading...</strong> }
                            </CardText>
                            {/* <Button href={this.state.user.html_url} >Github</Button>
                                <Button>Follow!</Button> */}
                        </CardBody>
                        
                        {/* Followers for that user: */}
                        <CardFooter>
                            <CardTitle tag='h5'>Followers:</CardTitle>
                            <Row>
                                <Col>
                                    <ButtonGroup vertical className='follower-group'>
                                        {this.state.followers.slice(0,5).map(item => {
                                            //console.log(item);
                                            return (
                                                <Button 
                                                key={item.id}
                                                href={item.html_url}>
                                                    {item.login}
                                                </Button>
                                            )
                                        })}
                                    </ButtonGroup>
                                </Col>
                                <Col>
                                    <ButtonGroup vertical>
                                    {this.state.followers.slice(5,10).map(item => {
                                            //console.log(item);
                                            return (
                                                <Button 
                                                key={item.id}
                                                href={item.html_url}>
                                                    {item.login}
                                                </Button>
                                            )
                                        })}
                                    </ButtonGroup>
                                </Col>
                            
                            </Row>
                        </CardFooter>
                        
                    </Card>
                </div>
            </div>
        )
    }
}

export default App;