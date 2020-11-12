import { useEffect, useState } from "react";
import axios from 'axios';
import  Select from 'react-select';

const toISODate = (date, time) => {
    let parsed_time = Date.parse(date + ' ' + time);
    let dateObj = new Date(parsed_time);
    return dateObj.toISOString();
};

function InterviewCreate() {
    const [company, setCompany] = useState('');
    const [start_date, setStrtDate] = useState(null);
    const [end_date, setEndDate] = useState(null);
    const [start_time, setStrtTime] = useState(null);
    const [end_time, setEndTime] = useState(null);
    const [place, setPlace] = useState('');
    const [position, setPosition] = useState('');
    const [selected_participants, setSelectedParticipants] = useState([]);
    const [all_participants, setAllParticipants] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let req_data = {
            company,
            start_time : toISODate(start_date, start_time),
            end_time : toISODate(end_date, end_time),
            place,
            position,
            participants: selected_participants.map(el => { return {id : el.id} }),
        }
        if (req_data.participants.length < 2) {
            alert('More than 2 participants needed');
        } else {
            const apiURL = "http://localhost:5000/interview/add/";
            axios.post(apiURL, req_data)
            .then(resp => { 
                    console.log(resp.data);
            }).catch(err => {
                if (err) {
                    alert('Could not create interview');
                    console.log(err);
                }
            });
        }

        console.log(req_data);
    };

    useEffect(() => {
        const apiURL = "http://localhost:5000/participant/all/";
        axios.get(apiURL)
            .then(resp => { console.log(resp.data); setAllParticipants(resp.data); });
    }, []);

    return (
        <div className="card form-box">
        <div className="card-body">
            <h3 className="card-title">Create New Interview</h3>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label className="card-subtitle form-label">Company</label>
                    <input type="text" value={company} onChange={e => setCompany(e.target.value)}></input>
                </div>

                <div className="form-group">
                    <label className="card-subtitle form-label">Starts at</label>
                    <input type="date" value={start_date} onChange={e => setStrtDate(e.target.value)} required></input>
                    <input type="time" value={start_time} onChange={e => setStrtTime(e.target.value)} required></input>
                </div>

                <div className="form-group">
                    <label className="card-subtitle form-label">Ends at</label>
                    <input type="date" value={end_date}  onChange={e => setEndDate(e.target.value)} required></input>
                    <input type="time" value={end_time} onChange={e => setEndTime(e.target.value)} required></input>
                </div>

                <div className="form-group">
                    <label className="card-subtitle form-label">Place</label>
                    <input type="text" value={place} onChange={e => setPlace(e.target.value)}></input>
                </div>

                <div className="form-group">
                    <label className="card-subtitle form-label">Position</label>
                    <input type="text" value={position} onChange={e => setPosition(e.target.value)}></input>
                </div>

                <div>
                    <label className="card-subtitle form-label">Participants</label>
                    <Select
                        isMulti
                        options={all_participants}
                        getOptionLabel={option => option.name + ' - ' + option.company }
                        getOptionValue={option => option.id}
                        value={selected_participants}
                        onChange={(arr, op) => setSelectedParticipants(arr)}
                        
                    />
                </div>

                <div>
                    <button className="card-subtitle form-label">Create Interview</button>
                </div>

            </form>
        </div>
        </div>
    );
}

export default InterviewCreate;
