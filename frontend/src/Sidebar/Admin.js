import './Sidebar.css'
import './main.css'
import admin from './admin.svg';
import React, { Component } from 'react';
import Popup from 'reactjs-popup';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [] }
        this.showUsersInFire = this.showUsersInFire.bind(this);
        this.showPopularIncidents = this.showPopularIncidents.bind(this);
    }

    showUsersInFire(e) {
        e.preventDefault();
        fetch(`https://api.projectnull76.web.illinois.edu/api/admin/userInFire/${encodeURIComponent(this.props.userId)}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        results: result.map((document) => {
                            return document.userId;
                        })
                    });
                },
                (error) => {
                    alert("failed (perhaps you are not the admin user)");
                });
    };

    showPopularIncidents(e) {
        e.preventDefault();
        fetch(`https://api.projectnull76.web.illinois.edu/api/admin/popularIncidents/${encodeURIComponent(this.props.userId)}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        results: result.map((document) => {
                            return document.incidentName + ": " + document.count + " comments";
                        })
                    });
                },
                (error) => {
                    alert("failed (perhaps you are not the admin user)");
                });
    }

    render() {
        let results = this.state.results.map((result, idx) => {
            return (<li key={idx}>{result}</li>);
        });

        return (
            <div className='sidebarItem'>
                <Popup trigger={<img style={{ width: '8vw' }} alt="admin" src={admin} />} modal nested>
                    {
                        close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div>
                                    <nav>
                                        <ul>
                                            {results}
                                        </ul>
                                    </nav>
                                    <div className="userInputDiv">
                                        <button onClick={this.showUsersInFire}>showUsersInFire </button>
                                        <button onClick={this.showPopularIncidents}>showPopularIncidents </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Popup>
            </div>
        )
    }
}

export default Admin;