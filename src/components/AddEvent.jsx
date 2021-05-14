import React from 'react';
import { getTime } from 'date-fns';
import { db } from '../firebase';
import { motion } from "framer-motion";

class AddEvent extends React.Component {

    state = {
        form: {
            name: 'choose',
            debut: '',
            fin: '',
            rdv: ''
        },
        validate: {
            name: false,
            debut: false,
            rdv: false,
        }
    }

    inputChange = (e, type) => {
        e.preventDefault();

        this.validate(type, e.target.value)

        let form = {...this.state.form}
        form[type] = e.target.value;
        this.setState({ form })

    }

    validate = (type, value) => {

        const membres = ['sacha', 'charly', 'matheo', 'julie', 'sylvain'];
        let validate = {...this.state.validate}

        if (type === 'name') {
            if ( membres.includes(value) ) {
                validate[type] = true
                this.setState({ validate })
                return true
            } else {
                validate[type] = false
                this.setState({ validate })
            }
        } else {
            if (value.length > 2) {
                validate[type] = true
                this.setState({ validate })
                return true
            } else {
                validate[type] = false
                this.setState({ validate })
            }
        }

        return false;
    }

    submitEvent = e => {
        e.preventDefault();

        const checkValidate = Object.values( this.state.validate )
        if ( !checkValidate.includes(false) ) {
            let form = this.state.form

            form.date = this.props.selected

            let month = this.props.selected.split('-')
            month = month[1] + '-' + month[2]
            form.month = month

            db.collection('events')
                .add(form)
                .then( this.props.toggleForm )
                .then( this.props.getMonthEvents )
                .catch(err => console.log(err))
        }
    }

    render(){

        const checkValidate = Object.values( this.state.validate )
        const validator = checkValidate.includes(false) ? 'danger' : 'hidden';

        return (
            
            <motion.form
                id="add-event" 
                onSubmit={this.submitEvent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", stiffness: 10, duration: .25 }}
            >

                <div className="form-group">
                    <label htmlFor="name">Pour qui ?</label>
                    <select 
                        id="name"
                        value={this.state.form.name}
                        onChange={ e => this.inputChange(e, 'name') }
                    >
                        <option value="choose">-- choisir --</option>
                        <option value="sacha">Sacha</option>
                        <option value="charly">Charly</option>
                        <option value="matheo">Mathéo</option>
                        <option value="julie">Julie</option>
                        <option value="sylvain">Sylvain</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="debut">Heure de début</label>
                    <input 
                        type="time" 
                        id="debut"
                        onChange={ e => this.inputChange(e, 'debut') }
                        autoComplete="off"
                        />
                </div>

                <div className="form-group">
                    <label htmlFor="fin">Heure de fin (optionnel)</label>
                    <input 
                        type="time"
                        id="fin"
                        onChange={ e => this.inputChange(e, 'fin') }
                        autoComplete="off"
                        />
                </div>

                <div className="form-group">
                    <label htmlFor="rdv">Rendez-vous</label>
                    <input 
                        type="text" 
                        id="rdv"
                        onChange={ e => this.inputChange(e, 'rdv') }
                        autoComplete="off"
                        />
                </div>

                <div className="form-group" id="add-event-submit-group">
                    <p className={`help ${validator}`}>Un ou plusieurs champs ne sont pas correctement remplis</p>
                    <button type="submit" className="primary">Valider</button>
                </div>

            </motion.form>
            
        );
    }
}

export default AddEvent