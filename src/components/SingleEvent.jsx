import React from 'react';
import { IoTrash } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';

class SingleEvent extends React.Component {

    deleteEvent = () => {
        const date = this.props.event.day + '-' + this.props.event.month + '-' + this.props.event.year
        db.collection('events').where('date', '==', this.props.event.date).where('rdv', '==', this.props.event.rdv)
            .get()
            .then(result => {
                result.forEach(doc => doc.ref.delete())
            })
    }

    render(){
        return (
            <motion.div
                key={this.props.event.date}
                className={`event ${this.props.event.name}`}
                initial={{x: '-100%'}}
                animate={{x: 0}}
                exit={{opacity: 0}}
                transition={{duration: .25, type: 'tween', swiftness: 100, delay: this.props.delay}}
            >

                <motion.div
                    className="event-content"
                    drag="x"
                    dragConstraints={{
                        left: -60,
                        right: 0,
                    }}
                    dragElastic={{left: 0.2}}
                >                
                    <h2>{this.props.event.name}</h2>
                    <div className="rdv">
                        <span className="rdv-name">{this.props.event.rdv}</span>
                        <span className="horaire">{this.props.event.debut}{this.props.event.fin && ` - ${this.props.event.fin}`}</span>
                    </div>
                </motion.div>

                <div className="event-actions">
                    <div className="icon delete" onClick={this.deleteEvent}>
                        <motion.div
                            whileTap={{scale: .9}}
                        >
                            <IoTrash />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        );
    }
}

export default SingleEvent