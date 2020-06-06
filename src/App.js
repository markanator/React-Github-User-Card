import React from 'react';
import axios from 'axios';
import {Card,CardBody,CardFooter,
        CardImg,CardTitle,CardSubtitle,CardText,ButtonGroup,
        Button, Row, Col, Form, Label, Input, Spinner} from 'reactstrap';

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
        setTimeout(()=>

        
        axios.get(`https://api.github.com/users/${this.state.username}`)
            .then(resp => {
                //console.log(resp.data)
                this.setState({user: resp.data})
                this.setState({isLoading:false});
            })
            .catch(err => {
                console.log(err)
                this.setState({isLoading:false});
            }),

        axios.get(`https://api.github.com/users/${this.state.username}/followers`)
            .then((resp) => {
                //console.log(resp.data);
                this.setState({followers: resp.data})
                this.setState({isLoading:false});
            })
            .catch(err => {
                console.log(err)
                this.setState({isLoading:false});
            })

            ,5000);
    }

    handleChange = e =>{
        e.preventDefault();
        this.setState({username: e.target.value.toLowerCase()})
    }

    render() {
        if(this.state.isLoading){
            return <Spinner style={{ width: '3rem', height: '3rem' }} />
        }
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
                                <strong>{this.state.user.name}</strong>
                            </CardTitle>
                            <CardSubtitle>
                                <em>{this.state.user.location}</em>
                            </CardSubtitle >
                            <CardText>
                                {this.state.user.bio}}
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