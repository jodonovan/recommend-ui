// ** create-user.component.js ** //

import React, {Component} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentProgram: 'defaultvalue',
            resourceCompleted: '',
            currentSkill: 'Skill1',
            skills: [],
            // skillSelected: '42dab5d2-a42c-41df-836a-e7823b53005d',
            skillSelected: '',
            resources: {items: []},
            recommendations: []

        }
        this.handleChangeCurrentProgramChange = this.handleChangeCurrentProgramChange.bind(this);
        this.handleresourceCompletedChange = this.handleresourceCompletedChange.bind(this);
        this.handleChangeCurrentSkillChange = this.handleChangeCurrentSkillChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProgramChange = this.handleProgramChange.bind(this);
        this.loadSkills = this.loadSkills.bind(this);
        this.loadRecommendations = this.loadRecommendations.bind(this);

    }

    handleChangeCurrentProgramChange(event) {
        this.setState({currentProgram: event.target.value});
        this.handleProgramChange(event);
    }

    handleresourceCompletedChange(event) {
        this.setState({resourceCompleted: event.target.value});
        console.log("Resource selected " + this.state.resourceCompleted)
        this.loadSkills(event)

    }

    handleChangeCurrentSkillChange(event) {
        this.setState({skillSelected: event.target.value});
        console.log("Skill selected " + this.state.skillSelected)

    }

    handleProgramChange(event) {
        // alert('Options ' + this.state.currentProgram + " " + this.state.resourceCompleted + " " + this.state.currentSkill);
        event.preventDefault();

        const requestObject = {
            currentProgram: this.state.currentProgram,
            resourceCompleted: this.state.resourceCompleted,
            currentSkill: this.state.currentSkill
        };

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        console.log("Request Object: " + requestObject.currentProgram + " " + requestObject.resourceCompleted + " " +
            requestObject.currentSkill)

        // axios.post('http://localhost:4000/users/create', userObject)
        // axios.post('http://localhost:8081', requestObject, {headers: headers})
        axios.get('http://localhost:8080/skills/getTOCItems', requestObject, {headers: headers})
            .then((res) => {
                console.log(res.data)
                this.setState({resources: res.data});
            }).catch((error) => {
            console.log(error)
        });
    }

    loadSkills(event) {
        console.log("Resource Selected in loadSkills : " + event.target.value);
        const resourceSelected = event.target.value;
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        axios.get('http://localhost:8080/skills/getSkillsForTOCItem/' + resourceSelected, null, {headers: headers})
            .then((res) => {
                console.log(res.data)
                this.setState({skills: res.data});
            }).catch((error) => {
            console.log(error)
        });
    }


    loadRecommendations() {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        console.log("Params : skillId : " + this.state.skillSelected + " resourceId " + this.state.resourceCompleted)
        axios.get('http://localhost:8080/skills/getRecommendations/skillId/' + this.state.skillSelected + '/start/' + this.state.resourceCompleted, null, {headers: headers})
            .then((res) => {
                console.log(res.data)
                this.setState({recommendations: res.data});
            }).catch((error) => {
            console.log(error)
        });

    }

    handleSubmit(event) {

    }

    // onSubmit(e) {
    //     e.preventDefault()
    //
    //     const userObject = {
    //         name: this.state.name,
    //         email: this.state.email
    //     };
    //
    //     console.log("User Object: " + userObject.name + " " + userObject.email)
    //
    //     // axios.post('http://localhost:4000/users/create', userObject)
    //     axios.post('http://localhost:8081', userObject)
    //         .then((res) => {
    //             console.log(res.data)
    //         }).catch((error) => {
    //         console.log(error)
    //     });
    //
    //     this.setState({ name: '', email: '' })
    // }

    renderTableData() {
        return this.state.recommendations.map((recommendation, index) => {
            const {title, description, grade, mediaType} = recommendation.data;//destructuring
            const rankedScore = recommendation.rankedScore; //destructuring
            return (
                <tr key={rankedScore}>
                    <td><strong>{rankedScore}</strong></td>
                    <td>{title}</td>
                    <td>{description}</td>
                    <td>{grade}</td>
                    <td>{mediaType}</td>
                    <td><Button variant="success">Assign</Button></td>
                </tr>
            )
        })
    }


    render() {
        return (

            <Container>
                <Row className="selects">
                    <Col>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label><strong>Current Program:</strong></Form.Label>
                                <Form.Control as="select" value={this.state.currentProgram}
                                              onChange={this.handleChangeCurrentProgramChange}>
                                    <option value="defaultvalue">Select Program</option>
                                    <option value="ELA_NGL_G7_TX">HMH Into Literature Texas Grade 7</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label><strong>Resource Item Completed:</strong></Form.Label>
                                <Form.Control as="select" onChange={this.handleresourceCompletedChange}>
                                    <option value="defaultvalue">Select Resource</option>
                                    {this.state.resources.items.map((e, key) => {
                                        return <option key={key} value={e.identifier}>{e.displayTitle}</option>;
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label><strong>Current Skill:</strong></Form.Label>
                                <Form.Control as="select" onChange={this.handleChangeCurrentSkillChange}>
                                    <option value="defaultvalue">Select Skill</option>
                                    {this.state.skills.map((e, key) => {
                                        return <option key={key} value={e.skillId}>{e.skillName}</option>;
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button onClick={this.loadRecommendations} className='selects' type='button'>Show
                                Recommendations</Button>

                        </Form>
                    </Col>
                </Row>
                <Row className="mt-50 result-table">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Grade</th>
                                <th>Media Type</th>
                                <th>Assign</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderTableData()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>









        );
    }
}