const e = require('express')
const enums = require('./enums')

input = 'BACKLOGd'
if(enums.TASK_STATUS.hasOwnProperty(input))
    console.log('Valid input')
else console.log('Invalid Input')


console.log(enums.TASK_STATUS.BACKLOG)