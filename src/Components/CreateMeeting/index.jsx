import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField'
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DescriptionIcon from '@mui/icons-material/Description';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PeopleIcon from '@mui/icons-material/People';
import DateAdapter from '@mui/lab/AdapterMoment';
import Fab from '@mui/material/Fab';
import axios from "client/axios.js"
import endpoints from "endpoints.json"
import moment from "moment"
import Autocomplete from '@mui/material/Autocomplete';

import "./create-meeting.css"

let dummyParticipants = [
    {
        "_id": "6195fb7729244cf0e464547f",
        "name": "Anish(U)",
        "email": "anish@gmail.com",
        "createdAt": "2021-11-18T07:06:31.490Z",
        "updatedAt": "2021-11-18T07:15:05.447Z",
        "__v": 0,
        "phone": 9821455745
    },
    {
        "_id": "6195fb7729244cf0e464547e",
        "name": "Anish2",
        "email": "anish2@gmail.com",
        "createdAt": "2021-11-18T07:06:31.490Z",
        "updatedAt": "2021-11-18T07:15:05.447Z",
        "__v": 0,
        "phone": 9821455745
    }
]
const CreateMeeting = () => {
    const admin = JSON.parse(localStorage.getItem("admin"))
    const navigate = useNavigate()
    const { state } = useLocation()
    let defaults = {
        title: "",
        agenda: "",
        startTime: moment(Date.now()),
        endTime: moment(Date.now()),
        participants: [],
    }
    console.log("state ", state);
    if (state.id) {
        defaults = {
            ...state,
            startTime: moment(state.startTime),
            endTime: moment(state.endTime),
        }
        console.log("defaults ", defaults);
    }
    const [participants, setParticipants] = useState([])
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        ...defaults
    })
    const handleFormChange = (prop) => (ev) => {

        if (prop === "endTime") {
            if (ev.diff(form.startTime, "minutes") < 10) {
                setError("EndTime Should be greater than startTime by 10 minutes")
                return
            }
            else setError("")
        }
        setForm({ ...form, [prop]: ev.target?.value || ev })
    }
    const handleParticipant = (val) => {
        let ids = val.map(p => p._id)
        setForm({ ...form, "participants": ids })
    }
    const cancelCreate = () => {
        navigate("/dashboard")
    }
    const fetchParticipants = async () => {
        try {
            let res = await axios.get(endpoints.getParticipants)
            console.log(res);
            if (res.data.success) setParticipants(res.data.participants)
        }
        catch (err) {
            console.log("Error fetching Participants")
        }
    }
    const saveMeeting = async () => {
        console.log("Meeting ", form);
        if (form.endTime.diff(form.startTime, "minutes") < 10) {
            setError("EndTime Should be greater than startTime by 10 minutes")
            return
        }
        if (form.id) {
            updateMeeting()
            return
        }
        let payload = {
            ...form,
            adminId: admin._id
        }
        try {
            let res = await axios.post(endpoints.createMeeting, payload)
            console.log(res);
            if (res.data.success) {
                navigate("/dashboard")
            }
        } catch (err) {

            if (err.response?.data) {
                setError(err.response.data.err)
            }
            console.log("ewrror creating meeting", err.response);
        }
    }
    const updateMeeting = async () => {
        console.log("Meeting ", form);
        let payload = {
            ...form,
            adminId: admin._id
        }
        try {
            let res = await axios.put(endpoints.updateMeeting + form.id, payload)
            console.log(res);
            if (res.data.success) {
                navigate("/dashboard")
            }
        } catch (err) {

            if (err.response?.data) {
                setError(err.response.data.err)
            }
            console.log("ewrror creating meeting", err.response);
        }
    }
    useEffect(() => { fetchParticipants() }, [])
    return (
        <div className="page">
            <div className="page-heading">
                <h2>Create Interview</h2>
                <div className="create-controls">
                    <Fab variant="extended" size="medium" color="primary" aria-label="add" onClick={saveMeeting} >
                        Save
                    </Fab>
                    <Fab variant="extended" size="medium" color="secondary" aria-label="add" onClick={cancelCreate}>
                        Cancel
                    </Fab>
                </div>
            </div>
            <div className="page-body">
                <div className="create-interview-form">
                    <div className="form-group">
                        <div className="form-icon">
                            <EditIcon />
                        </div>
                        <TextField
                            fullWidth
                            id="title"
                            value={form.title}
                            placeholder="Add a Title"
                            onChange={handleFormChange("title")}

                        />
                    </div>

                    <div className="form-group">
                        <div className="form-icon">
                            <PeopleIcon />
                        </div>
                        <Autocomplete
                            fullWidth
                            multiple
                            id="participants"
                            options={participants.filter(p => !form.participants.map(p2 => p2._id).includes(p._id))}

                            // renderOption={(obj, option) =>
                            //     <p
                            //         key={option._id}
                            //         className="option-item"
                            //         onClick={obj.onClick}
                            //         onMouseOver={obj.onMouseOver}
                            //         onTouchStart={obj.onTouchStart}
                            //     >{option.name}</p>
                            // }
                            getOptionLabel={(option) => option.name}
                            value={form.participants}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Add Participants"
                                />
                            )}
                            onChange={(ev, val) => { handleParticipant(val) }}
                        />
                    </div>

                    <div className="form-group">
                        <div className="form-icon">
                            <DescriptionIcon />
                        </div>
                        <TextField
                            fullWidth
                            id="details"
                            value={form.agenda}
                            placeholder="A little details of the meeting"
                            onChange={handleFormChange("agenda")}
                            multiline
                            rows={4}

                        />
                    </div>

                    <div className="form-group">
                        <div className="form-icon">
                            <AccessTimeFilledIcon />
                        </div>
                        <div className="form-group-half">
                            <LocalizationProvider dateAdapter={DateAdapter}>

                                <DateTimePicker
                                    minDate={moment(Date.now())}
                                    value={form.startTime}
                                    onChange={handleFormChange("startTime")}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <span>-</span>
                        <div className="form-group-half">

                            <LocalizationProvider dateAdapter={DateAdapter}>

                                <DateTimePicker
                                    minDate={form.endTime}
                                    value={form.endTime}
                                    onChange={handleFormChange("endTime")}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>

                    </div>
                    <div className="form-group">
                        <div className="error-message">
                            {error}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateMeeting;
