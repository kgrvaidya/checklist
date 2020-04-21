import React from 'react';
import { connect } from 'react-redux';
import { requestTaskMutation } from '../store/mutations';
import { Link } from 'react-router-dom';

export const TaskList = ({tasks, name, id, createTask}) => (
    <div>
        <h3> { name } </h3>
        {tasks.map(task => (
            <Link to={`/task/${task.id}`} key={task.id}>
                <div key={task.id}>{task.name}</div>
            </Link>
            ))}
        <button onClick={ () => createTask(id) }>Add New</button>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let groupId = ownProps.id;
    return {
        name : ownProps.name,
        id : groupId,
        tasks : state.tasks.filter(task => task.group === groupId)
    }
}

const mapDispatchToProps = (dispacth, ownProps) => {
    return {
        createTask(id) {
            console.log("Creating Task...", id);
            dispacth(requestTaskMutation(id))
        }
    }
}

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);