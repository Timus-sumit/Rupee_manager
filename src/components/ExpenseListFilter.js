import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';
import {setTextFilter, sortByAmount, sortByDate,setStartDate,setEndDate} from '../actions/filters';

class ExpenseListFilter extends React.Component {
    state ={
        calendarFocused : null
    }
    onDatesChange=({startDate,endDate})=>{
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }
    onFocusChange=(calendarFocused)=>{
        this.setState(()=>{
            return {
                calendarFocused
            }
        })
    }
    render(){
        return (
            <div className="contentContainer">
                <div className="input-form">
                    <div className="input-form__form">
                        <input type='text' className="text-input" value={this.props.filter.text} placeholder="Search Expenses" onChange={(e)=>{
                            this.props.dispatch(setTextFilter(e.target.value))
                        }}/>
                    </div>
                    <div className="input-form__form">
                        <select className="select" value={this.props.filter.sortBy} onChange={(e)=>{
                            if(e.target.value==='date'){
                                this.props.dispatch(sortByDate());
                            }else if(e.target.value==='amount'){
                                this.props.dispatch(sortByAmount());
                            }
                        }}>
                            <option value='date'>Date</option>
                            <option value='amount'>Amount</option>
                        </select>
                    </div>
                    <div className="input-form__form">
                        <DateRangePicker
                        startDate={this.props.filter.startDate} // momentPropTypes.momentObj or null,
                        endDate={this.props.filter.endDate} // momentPropTypes.momentObj or null,
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={()=>false}
                        showClearDates={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps =(state)=>{
    return {
        filter : state.filter
    }
}
export default connect(mapStateToProps)(ExpenseListFilter);