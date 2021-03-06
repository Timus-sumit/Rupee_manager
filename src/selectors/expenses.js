//get_visible_data
import moment from 'moment';

const getVisibleData = (expenses,{text,sortBy,startDate,endDate})=>{
    return expenses.filter((expense)=>{
        const createdAtMoment = moment(expense.createdAt);
        const start = startDate ? startDate.isSameOrBefore(createdAtMoment,'day'):true;
        const end = endDate ? endDate.isSameOrAfter(createdAtMoment,'day'):true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return (textMatch && start && end);
    }).sort((a,b)=>{
        if(sortBy==='date'){
            return a.createdAt<b.createdAt ? 1:-1;
        }
        else if(sortBy==='amount'){
            return a.amount<b.amount?1:-1;
        }
    })
}

export default getVisibleData;