import React from 'react'
import { connect } from 'react-redux'
import { popForm, undoForm } from 'Client/JS/Actions/index'
import './SideNav.css'
import AddLogo from 'Client/Assets/AddToList.svg'
import HistoryLogo from 'Client/Assets/history.svg'

class SideNav extends React.Component {
    render() {
        return (
            <div className="sidenav">
                <AddLogo className="logo" onClick={() => (
                    this.props.form.isPopped ? this.props.undoForm() : this.props.popForm()
                )} />
                <HistoryLogo className='logo' />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        form: state.form
    }
}

const mapDispatchToProps = dispatch => {
    return {
        popForm: form => dispatch(popForm(form)),
        undoForm: form => dispatch(undoForm(form))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav)
