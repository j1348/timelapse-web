import React from 'react';
import { createEditorState, Editor } from 'medium-draft';
import moment from 'moment';

moment.locale('fr');

const DAY_OFF = [5, 6];

class Day extends React.Component {
    constructor() {
        super();

        const now = moment();
        this.state = {
            now,
            editorState: createEditorState()
        };

        this.onChange = (editorState) => {
            this.setState({ now, editorState });
        };
    }

    render() {
        const d = +this.props.d;
        if (typeof d === 'number') {
            const m = this.state.now.add('d', d);
            const classNames = ['day'];
            const dayOff = (DAY_OFF.indexOf(this.state.now.weekday()) !== -1)
                         ? 'day--off' : '';
            let month = '';

            if (m.daysInMonth() === m.date()) {
                month = (<div className="month">
                  <h3>{m.format('MMMM YYYY')}</h3>
                </div>);
            }

            classNames.push(dayOff);

            if (!d) { // today
                classNames.push('day--today');

                // in 15 minutes
                const soon = m;
                soon.add('minutes', (30 - soon.minute()) % 15);

                const { editorState } = this.state;

                editorState.placeholder = 'placeholder';

                return (<div>
                  { month }
                  <div className={classNames.join(' ')} key={this.m}>
                    <h4>
                      <span className="day__oftheweek">{m.format('dddd')}</span>
                      <span className="day__number">{m.format('DD')}</span>
                    </h4>
                    <div className="day__content">
                      <div className="day__hour">{soon.format('LT')}</div>
                      <div className="day__txt">
                        <Editor
                          editorState={editorState}
                          placeholder="Here it is..."
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>);
            }
            return (<div>
              { month }
              <div className={classNames.join(' ')} key={this.m}>
                <h5>
                  <span className="day__oftheweek">{m.format('dddd')}</span>
                  <span className="day__number">{m.format('DD')}</span>
                </h5>
                <div className="day__content" />
              </div>
            </div>);
        }

        return (<div>nothing to display {d}</div>);
    }
}

Day.propTypes = {
    d: React.PropTypes.number
};

export default Day;

/*
<p>N’importe quel imbécile intelligent peut rendre les choses plus grandes,
 plus complexes et plus violentes. Il faut une touche de génie - et beaucoup
  de courage  - pour aller dans la direction opposée.</p> */
