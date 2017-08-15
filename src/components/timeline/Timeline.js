/* eslint func-names: ["error", "never"] */
import React from 'react';
import moment from 'moment';
import Day from './Day';

moment.locale('fr');

class Timeline extends React.Component {
    constructor() {
        super();

        this.pastDays = [];
        for (let i = 7; i > -45; i -= 1) {
            this.pastDays.push(i);
        }
    }

    render() {
        return (
            <div className="days">
                {this.pastDays.map((d, i) => <Day key={i} d={d} />)}
            </div>
        );
    }
}

export default Timeline;
