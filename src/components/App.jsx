import React from 'react'
import { subMonths, addMonths, format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { db } from '../firebase';

import Header from './Header';
import Grid from './Grid';
import Selected from './Selected';
import SingleEvent from './SingleEvent';
import AddEvent from './AddEvent';

class App extends React.Component {

	state = {
		date: new Date(),
		selected: format(new Date(), 'd-M-yyyy'),
		gridDirection: 'next',
		eventsList: [],
		daysWithEvents: [],
		showForm: false,
	}

	componentDidMount(){
		this.getSelectedDayEvents()
		this.getMonthEvents()
	}

	getSelectedDayEvents = () => {
		db.collection('events').where('date', '==', this.state.selected)
		.onSnapshot(snap => {
			let eventsList = []
			snap.docs.forEach(doc => {
				eventsList.push(doc.data())
			})
			this.setState({ eventsList })
		})
	}

	getMonthEvents = () => {

		let selectedMonth = format(this.state.date, 'M-yyyy').split('-')
		selectedMonth = selectedMonth[0] + '-' + selectedMonth[1]

		db.collection('events').where('month', '==', selectedMonth)
		.onSnapshot(snap => {
			let daysWithEvents = []
			snap.docs.forEach(doc => {
				const day = doc.data().date.split('-')[0]
				if ( !daysWithEvents.includes(day) ) {
					daysWithEvents.push(Number(day))
				}
			})
			this.setState({ daysWithEvents })
		})
		
	}

	changeMonth = direction => { //Doit changer la grid selon le mois, et récupérer les jours du nouveau mois qui ont au moins un event

		let date = this.state.date

		if (direction === 'previous' ) {
			date = subMonths(date, 1)
		} else if (direction === 'next') {
			date = addMonths (date, 1)
		}
		
		this.setState({ gridDirection: direction }, () => {
			this.setState({ date }, () => {
				this.getMonthEvents()
			})
		})
	}

	changeSelected = selected => {
		this.setState({ selected }, () => {
			this.getSelectedDayEvents()
		})
	}

	toggleForm = () => {
		this.setState({ showForm: !this.state.showForm })
	}

	render() {

		const eventsList = Object.keys(this.state.eventsList).map(key => 
			<SingleEvent key={key} delay={key/10} event={this.state.eventsList[key]} />
		)

		return (
			<div id="app">
				
				<Header 
					date={this.state.date} 
					changeMonth={this.changeMonth} 
				/>

				<Grid 
					date={this.state.date}
					direction={this.state.gridDirection}
					changeSelected={this.changeSelected}
					selected={this.state.selected}
					daysWithEvents={this.state.daysWithEvents}
				/>

				<motion.div
					id="events-wrapper"
					className={this.state.showForm === false ? 'closed' : 'open'}
					initial={this.state.showForm === false ? {y: 0} : {y: -410}}
					animate={this.state.showForm === false ? {y: 0} : {y: -410}}
					transition={{swiftness: 10, duration: .15, type: 'tween'}}
				>

					<Selected 
						selected={this.state.selected}
						formOpen={this.state.showForm}
						toggleForm={this.toggleForm}
					/>

					<div id="events">
						<AnimatePresence>
							{ this.state.showForm === false ? eventsList : <AddEvent selected={this.state.selected} toggleForm={this.toggleForm} getMonthEvents={this.getMonthEvents} /> }
						</AnimatePresence>
					</div>

				</motion.div>
				
			</div>
		)
	}

}

export default App