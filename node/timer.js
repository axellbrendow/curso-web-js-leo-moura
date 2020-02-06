const schedule = require('node-schedule');

// */5 = five in five seconds
// 5 = in second 5
// string model: 'second minute hour day month week-day(0 = sunday, 2 = tuesday)'
const task1 = schedule.scheduleJob('*/5 * 19 * * 4', () => {
    console.log('Executing task 1!', new Date().toString());
});

setTimeout(() => {
    task1.cancel();
    console.log('Cancelling task 1!', new Date().toString());
}, 20000);

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(1, 5)];
rule.hour = 19;
rule.second = 30;

const task2 = schedule.scheduleJob(rule, () => {
    console.log('Executing task 2!', new Date().toString());
});
