import React from 'react';
import Cell from './Cell';
import { getDaysInMonth, startOfMonth, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

class Grid extends React.Component {
    render(){

        /* Génération de cellules vides, si le mois ne commence pas par un lundi */
        let firstDayOfMonth = startOfMonth(this.props.date)                 //Objet date du premier jour du mois
        firstDayOfMonth = format(firstDayOfMonth, 'EEEE', {locale: fr})     //Jour de la semaine du 1er jour du mois
        const offset = {
            lundi: 0,
            mardi: 1,
            mercredi: 2,
            jeudi: 3,
            vendredi: 4,
            samedi: 5,
            dimance: 6,
        }
        const offsetNumber = offset[firstDayOfMonth]                        //Le nombre de cellules vides a générer
        let offsetCells = []
        for (let i=0; i < offsetNumber; i++){
            offsetCells.push('offsetCell')
        }
        offsetCells = Object.keys(offsetCells).map(key => 
            <Cell key={key} />    
        )

        /* Génération des jours du mois */
        const daysInMonth = getDaysInMonth(this.props.date)
        let cells = []
        for (let i=0; i < daysInMonth; i++){
            cells.push('cell')
        }
        cells = Object.keys(cells).map(key => 
            <Cell 
                key={key} 
                day={Number(key)+1} 
                month={format(this.props.date, 'M')} 
                year={format(this.props.date, 'yyyy')}
                changeSelected={this.props.changeSelected}
                selected={this.props.selected}
                daysWithEvents={this.props.daysWithEvents}
            />    
        )

        return (
            <div id="grid">

                <div id="grid-header">
                    <div className="cell">LUN</div>
                    <div className="cell">MAR</div>
                    <div className="cell">MER</div>
                    <div className="cell">JEU</div>
                    <div className="cell">VEN</div>
                    <div className="cell">SAM</div>
                    <div className="cell">DIM</div>
                </div>

                <div id="grid-body-wrapper">
                    <AnimatePresence>
                        <motion.div
                            id="grid-body"
                            key={this.props.date}
                            initial={{x: this.props.direction === 'next' ? '100%' : '-100%'}}
                            animate={{x: 0}}
                            exit={{x: this.props.direction === 'next' ? '-100%' : '100%'}}
                            transition={{type: 'tween', swiftness: 100, duration: .25}}
                        >
                            {offsetCells}
                            {cells}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        );
    }
}

export default Grid