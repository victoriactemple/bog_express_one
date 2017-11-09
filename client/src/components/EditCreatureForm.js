import React, { Component } from 'react';
import axios from 'axios'

class EditCreatureForm extends Component {
    state = {
        creature: {
            name: '',
            description: ''
        }
    }

    componentWillMount() {
        this.setState({ creature: this.props.creature })
    }

    handleChange = (event) => {
        const attribute = event.target.name
        const creature = { ...this.state.creature }

        creature[attribute] = event.target.value
        this.setState({ creature: creature })
    }

    
    handleSubmit = async (event) => {
        try {
            event.preventDefault()

            const creatureId = this.props.creature._id            
            const response = await axios.put(`/api/creatures/${creatureId}`, {
                creature: this.state.creature
            })
            // grab the method through props from Single Creature and use this ^^ response to set the state on SingleCreature.
                this.props.updateCreature(response.data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }



    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input onChange={this.handleChange} type="text"
                            name="name"
                            value={this.state.creature.name} />
                    </div>
                    <div>
                        <textarea onChange={this.handleChange} type="text"
                            name="description"
                            value={this.state.creature.description} />
                    </div>
                    <button>Submit Changes</button>
                </form>
            </div>
        );
    }
}

export default EditCreatureForm;