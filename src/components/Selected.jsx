import React from 'react';
import { IoAdd, IoClose } from 'react-icons/io5';
import { parse, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

class Selected extends React.Component {
    render(){

        let selection = parse(this.props.selected, 'd-M-yyyy', new Date())
        selection = format(selection, 'EEEE d MMMM yyyy', {locale: fr})

        return (
            <div id="selected" className="header">
                <div id="selection">
                    <p className="help">Sélectionné :</p>
                    <div id="selection-wrapper">
                        <motion.h2
                            key={this.props.selected}
                            initial={{y: -100, opcity: 0}}
                            animate={{y: 0, opcity: 1}}
                            transition={{type: 'tween', swiftness: 100, duration: .25}}
                        >
                            { selection }
                        </motion.h2>
                    </div>
                </div>
                <div className="icon after clickable" onClick={this.props.toggleForm}>
                    <motion.div
                        whileTap={{scale: .9}}
                    >
                        { this.props.formOpen === true ? <IoClose /> :  <IoAdd /> }
                    </motion.div>
                </div>
            </div>
        );
    }
}

export default Selected