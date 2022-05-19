import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../Static/Main.css'


const Main = (props) => {

    const [item, setItem] = useState([]);
    const [search, setSearch] = useState("")
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        axios.get('https://api.hatchways.io/assessment/students')
            .then(response => {setItem(response.data.students)})
    }, []);





    return (
        <div className="main">
            <input className="searchBar" type="text"
                placeholder="Search by name"
                onChange={e => 
                    {setSearch(e.target.value)
                }} //making an onchange event to detect the state change and update with every update to state (keystroke)
            />
            {item.filter((student) => {
                if(search == ""){ //if state (searchbar) is empty, we will show all students
                    return student
                } else if(student.firstName.toLowerCase().includes(search.toLowerCase())) { //else if state includes any student names, we will display them
                    return student
                }
            }).map((student, key) => {
                const average = student.grades.reduce((a,b) => { return a + b }, 0) / student.grades.length
                return (
                    <div>
                        <div className="students" key={key}>
                            <div className="photoDiv">
                                <img className="image" src={student.pic} />
                            </div>
                            <div className="name">
                                <h1>{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}
                                    <button className="button" type="button" data-toggle="collapse" data-target="#collapseGrade" aria-expanded="false" aria-controls="collapseGrade" onClick={e =>
                                        setClicked(!clicked)}>
                                            {`${clicked ? '-' : '+'}`}
                                    </button>
                                </h1>
                            <div className="info">
                                <p>Email: {student.email}</p>
                                <p>Company: {student.company}</p>
                                <p>Skill: {student.skill}</p>
                                <p>Average: {average}%</p>
                            </div>
                            <div className="collapse" id="collapseGrade">
                                Average: {student.grades}%
                            </div>
                            </div>
                            <div className="line">
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Main
