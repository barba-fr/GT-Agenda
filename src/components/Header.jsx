import React from 'react';
import { IoCaretBack, IoCaretForward } from 'react-icons/io5'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';

class Header extends React.Component {

    state = {
        initial: 0,
        exit: 0,
    }

    changeMonth = direction => {
        let initial, exit
        if (direction === 'previous') {
            initial = 100
            exit = -100
        } else if (direction === 'next') {
            initial = -100
            exit = 100
        }
        this.setState({ initial, exit }, () => {
            this.props.changeMonth(direction)
        })
    }

    render(){
        return (
            <header>
                <div className="icon before clickable" onClick={() => { this.changeMonth('previous') }}>
                    <motion.div
                        whileTap={{scale: .9}}
                    >
                        <IoCaretBack />
                    </motion.div>
                </div>
                <AnimatePresence>
                    <motion.h1
                        className="grid-title"
                        key={this.props.date}
                        initial={{y: this.state.initial, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: this.state.exit, opacity: 0}}
                        transition={{type: 'tween', swiftness: 100, duration: .25}}
                    >
                        { format(this.props.date, 'MMMM yyyy', {locale: fr}) }
                    </motion.h1>
                </AnimatePresence>
                <div className="icon after clickable" onClick={() => { this.changeMonth('next') }}>
                    <motion.div
                        whileTap={{scale: .9}}
                    >
                        <IoCaretForward />
                    </motion.div>
                </div>
            </header>
        );
    }

}

export default Header