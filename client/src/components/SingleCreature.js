import React, { Component } from 'react';
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import EditCreatureForm from './EditCreatureForm'

class SingleCreature extends Component {
    state = {
        creature: {
            name: '',
            description: ''
        }, 
        showEditForm: false,
        redirectToCreatures: false
    }

    componentWillMount() {
        this.getCreature()
    }

    getCreature = async () => {
        const creatureId = this.props.match.params.id
        const response = await axios.get(`/api/creatures/${creatureId}`)
        this.setState({creature: response.data})
        console.log(response.data)
    }

    toggleEditForm = () => {
        this.setState({showEditForm: !this.state.showEditForm})
    }

    // Method that will be passed down to EditCreatureForm 
    // set the State of the newCreature and then also hide the form
    updateCreature = (newCreature) => {
        this.setState({creature: newCreature, showEditForm: false})
    }

    deleteCreature = async (event) => {
      try{  const creatureId = this.props.match.params.id
        const response = await axios.delete(`/api/creatures/${creatureId}`)
        this.setState({redirectoToCreatures: true})
      } catch (error) {
          console.log(error)
      }

    }

    render() {
        if (this.state.redirectoToCreatures === true) {
            return(
                <Redirect to={"/"} />
            )
        }
        return (
            <div>
                <h1>One Creature's Show Page</h1>
                <h2>Name: {this.state.creature.name}</h2>
                <h3>Description: {this.state.creature.description}</h3>
                <button onClick={this.toggleEditForm}>Edit Creature</button>
                <button onClick={this.deleteCreature}>Delete Creature</button>

                {this.state.showEditForm ? <EditCreatureForm 
                showCreature={this.getCreature} 
                creature={this.state.creature}
                updateCreature={this.updateCreature}
                toggleEditForm={this.toggleEditForm} /> : null}
            </div>
        );
    }
}

export default SingleCreature;