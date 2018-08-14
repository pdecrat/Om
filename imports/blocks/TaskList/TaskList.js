import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import Content from '/imports/api/Content/Content';
import { callAction } from '/imports/api/Actions';
import { rem } from '/imports/ui/_lib/helpers-css';
import Block from '/imports/ui/_components/Block';

const StyledInput = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledTask = styled.li`
  display: flex;
  justify-content: space-between;
`

const StyledTaskList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${rem('15px')};
`

class TaskInput extends React.Component {

  state = {
    name: ''
  }

  render() {
    const {
      name,
    } = this.state;

    return (
      <StyledInput>
        <input value={name} onChange={e => {
          this.setState({
            name: e.target.value
          })
        }} />
        <button onClick={e => this.props.dispatchAddTask(name, this.props.target)} >Add {name}</button>
      </StyledInput>
    )
  }
}
const TaskInputMapState = ({ space }) => ({
  target: space.doc
})
const TaskInputMapDispatch = dispatch => ({
  dispatchAddTask: (name, target) => dispatch(callAction('addTask', target, { name })),
})
const ConnectedTaskInput = connect(TaskInputMapState, TaskInputMapDispatch)(TaskInput);


const TaskList = ({ tasks, dispatchRemoveTask }) =>
  <Block width={2} height={4}>
    <StyledTaskList>
      <h2>
        Task List
      </h2>
      <ConnectedTaskInput />
      <ul>
        {tasks.map(task =>
          <StyledTask key={task._id}>
            {task.name}
            <button onClick={e => { dispatchRemoveTask(task) }}>X</button>
          </StyledTask>
        )}
      </ul>
    </StyledTaskList>
  </Block>

const TrackedTaskList = withTracker(props => {
  const tasks = Content.find({
    parentId: props.target._id,
    type: 'task'
  }).fetch();
  return {
    ...props,
    tasks,
  }
})(TaskList);

const mapStateToProps = ({ space }) => ({
  target: space.doc,
})
const mapDispatchToProps = dispatch => ({
  dispatchRemoveTask: target => dispatch(callAction('removeTask', target, {}))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackedTaskList);
