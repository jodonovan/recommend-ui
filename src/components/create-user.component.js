// ** create-user.component.js ** //

import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export default class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentProgram: 'ELA_NGL_G7_TX',
            // resourceCompleted: 'Resource1',
            currentSkill:'Skill1',
            resources:{items : []}

        }
        this.handleChangeCurrentProgramChange = this.handleChangeCurrentProgramChange.bind(this);
        this.handleresourceCompletedChange = this.handleresourceCompletedChange.bind(this);
        this.handleChangeCurrentSkillChange = this.handleChangeCurrentSkillChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChangeCurrentProgramChange(event) {
        this.setState({currentProgram: event.target.value});
    }
    handleresourceCompletedChange(event) {
        this.setState({resourceCompleted: event.target.value});
    }
    handleChangeCurrentSkillChange(event) {
        this.setState({currentSkill: event.target.value});
    }

    handleSubmit(event) {
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



    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Current Program:
                    <select value={this.state.currentProgram} onChange={this.handleChangeCurrentProgramChange}>
                        <option value="ELA_NGL_G7_TX">HMH Into Literature Texas Grade 7</option>
                    </select>
                </label>
                <label>
                    Resource Completed:
                    <select onChange={this.handleresourceCompletedChange}>
                        {this.state.resources.items.map((e, key) => {
                            return <option key={key} value={e.identifier}>{e.displayTitle}</option>;
                        })}
                    </select>
                </label>
                <label>
                    Current Skill:
                    <select value={this.state.currentSkill} onChange={this.handleChangeCurrentSkillChange}>
                        <option value="Skill1">Skill1</option>
                        <option value="Skill2">Skill2</option>
                        <option value="Skill3">Skill3</option>
                        <option value="Skill4">Skill4</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}