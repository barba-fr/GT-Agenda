import React from 'react';
import { format } from 'date-fns';

class Cell extends React.Component {

    changeSelected = () => {
        this.props.changeSelected( this.props.day + '-' + this.props.month + '-' + this.props.year )
    }

    render(){

        let cellClass = ''
        const formatDate = this.props.day + '-' + this.props.month + '-' + this.props.year

        if ( formatDate === format(new Date(), 'd-M-yyy') ) {
            cellClass = cellClass + ' today'
        }

        if (formatDate === this.props.selected) {
            cellClass = cellClass + ' selected'
        }

        if ( this.props.daysWithEvents ) {
            if ( this.props.daysWithEvents.includes( this.props.day ) ) {
                cellClass = cellClass + ' has-event'
            }
        }

        return (
            <div className={`cell ${cellClass}`} onClick={this.changeSelected}>
                <span>{this.props.day}</span>
            </div>
        );
    }
}

export default Cell