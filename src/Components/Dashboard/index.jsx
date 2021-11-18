import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import MeetingItem from "Components/MeetingItem"
import endpoints from "endpoints.json"
import axios from "client/axios.js"

import "./dashboard.css"

const Dashboard = () => {

    const admin = JSON.parse(localStorage.getItem("admin"))
    const [meetings, setMeetings] = useState()

    const fetchMeetings = async () => {
        try {
            let res = await axios.get(endpoints.getAdminMeetings + admin._id)
            console.log(res);
            if (res.data.success) {
                setMeetings(res.data.meetings)
            }
        }
        catch (err) {
            console.log("error fetching meetings", err)
        }
    }
    useEffect(() => {
        fetchMeetings()
    }, [])
    return (
        <div className="page" >
            <div className="page-heading">
                <h2>Interviews Schedule</h2>
                <div className="create-interview">
                    <Link to='/create' className="create_btn">
                        <Fab variant="extended" size="medium" color="primary" aria-label="add">
                            <AddIcon style={{
                                margin: '0.3rem',
                                fontSize: '2rem'
                            }}
                            /> Schedule Interview
                        </Fab>
                    </Link>
                </div>
            </div>
            <div className="page-body">

                {
                    !meetings &&
                    <div className="loading" >
                        Loading...
                    </div>
                }

                {
                    meetings && meetings.length == 0 &&
                    <div className="empty-list" >
                        <div>
                            <p>
                                No Interviews Scheduled Yet.
                                To create a new meeting, click `Schedule`
                            </p>
                            <div className="create-interview">
                                <Link to='/create' className="create_btn">
                                    <Fab variant="extended" size="medium" color="primary" aria-label="add">
                                        <AddIcon style={{
                                            margin: '0.3rem',
                                            fontSize: '2rem'
                                        }}
                                        /> Schedule Interview
                                    </Fab>
                                </Link>
                            </div>

                        </div>

                    </div>
                }
                <div className="meeting-list">
                    {
                        meetings && meetings.map(meeting => (
                            <MeetingItem
                                key={meeting._id}
                                id={meeting._id}
                                title={meeting.title}
                                agenda={meeting.agenda}
                                startTime={meeting.startTime}
                                endTime={meeting.endTime}
                                participants={meeting.participants}
                            />
                        ))
                    }

                </div>
            </div>
        </div>

    );
}

export default Dashboard;
