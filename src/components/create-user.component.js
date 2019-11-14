// ** create-user.component.js ** //

import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';



export default class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentProgram: 'defaultvalue',
            resourceCompleted: 'Resource1',
            currentSkill:'Skill1',
            skills: [],
            skillSelected: '42dab5d2-a42c-41df-836a-e7823b53005d',
            resources:{items : []},
            recommendations:[]

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
        this.loadSkills()

    }
    handleChangeCurrentSkillChange(event) {
        this.setState({currentSkill: event.target.value});
        console.log("Skill selected " + this.state.currentSkill)

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
                this.setState({resources : res.data});
            }).catch((error) => {
            console.log(error)
        });
    }

    loadSkills(event) {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        axios.get('http://localhost:8080/skills/getSkillsForTOCItem/' + this.state.resourceCompleted, null, {headers: headers})
            .then((res) => {
                console.log(res.data)
                this.setState({skills : res.data});
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
                this.setState({recommendations : res.data});
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
            const { rankedScore } = recommendation.rankedScore //destructuring
            const { title, grade, mediaType } = recommendation.data//destructuring
            return (
                <tr key={rankedScore}>
                    <td>{rankedScore}</td>
                    <td>{title}</td>
                    <td>{grade}</td>
                    <td>{mediaType}</td>
                </tr>
            )
        })
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Current Program:
                    <select value={this.state.currentProgram} onChange={this.handleChangeCurrentProgramChange}>
                        <option value="defaultvalue">Select Program</option>
                        <option value="ELA_NGL_G7_TX">HMH Into Literature Texas Grade 7</option>
                    </select>
                </label>
                <label>
                    Resource Item Completed:
                    <select onChange={this.handleresourceCompletedChange}>
                        {this.state.resources.items.map((e, key) => {
                            return <option key={key} value={e.identifier}>{e.displayTitle}</option>;
                        })}
                    </select>
                </label>
                <label>
                    Current Skill:
                    <select onChange={this.handleChangeCurrentSkillChange}>
                        <option value="defaultvalue">Select Skill</option>
                        {this.state.skills.map((e, key) => {
                            return <option key={key} value={e.skillId}>{e.skillName}</option>;
                        })}
                    </select>
                </label>
                <button onClick={this.loadRecommendations} className='nextBtn' type='button'>Get Recommendations</button>
                <table>
                    <tbody>
                    {this.renderTableData()}
                    </tbody>
                </table>
            </form>





        );
    }
}