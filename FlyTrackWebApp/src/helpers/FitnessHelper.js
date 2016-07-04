/**
 * Created by sabir on 17.06.16.
 */
var moment = require('moment');

var assign = require('object-assign');

var FitnessHelper = {

    TRAINING_DAY_SPAN: 2,
    SCORE_ACTIVITY_NAME: 'SCORE_MEASUREMENT',


    transformSessionsToCalendarDaySessions: function(sessions){
        console.log('transformSessionsToCalendarDaySessions occured: sessions = ', sessions);
        if (sessions == undefined){
            sessions = [];
        }
        var arr = [];
        var daysMap = {};
        for (var i in sessions){
            var session = sessions[i];
            var start = moment(session.startTimestamp).startOf('day');
            var key = start + '';
            if (daysMap[key] == undefined){
                daysMap[key] = {
                    start: start,
                    sessions: []
                }
            }
            daysMap[key].sessions.push(session);
        }
        var self = this;
        var score = 0;
        for (var key in daysMap){
            var sessArray = daysMap[key].sessions;
            var max = -1;
            var hearRate = 0;
            var duration = 0;
            var activity = undefined;
            var deltaScore = undefined;
            for (var i in sessArray){
                var session = sessArray[i];
                var hr = session.avrHeartRate;
                var dur = (session.endTimestamp == undefined) ? 0 : (session.endTimestamp - session.startTimestamp);
                //console.log('endTimestamp, startTimestamp, dur = ', session.endTimestamp, session.startTimestamp, dur);
                //console.log('session duration - ' + dur);
                duration = duration + dur;
                if (session.score != undefined && session.score != 0){
                    deltaScore = session.score - score;
                    score = session.score;
                }
                if (dur > max){
                    max = dur;
                    activity = session.activity;
                    hearRate = hr;
                }
            }
            daysMap[key].avrHR = Math.round(hearRate);
            daysMap[key].duration = duration;
            daysMap[key].activity = activity;
            daysMap[key].energy = score;
            daysMap[key].deltaEnergy = deltaScore;
        }
        var res = [];
        for (var key in daysMap){
            res.push(daysMap[key]);
        }
        res.sort(function(d1, d2){return d2.start - d1.start;});
        return res;
    },

    getDaysForCalendarFromSessions: function(monthTimestamp, sessions){
        var arr = [];
        var map = {};
        var k = 0;
        for (var i in sessions){
            var s = sessions[i];
            var t = moment(s.start).startOf('day').format('x');
            var tS = '' + t;
            map[tS] = s;
        }

        var start = +moment(monthTimestamp).startOf('month').startOf('isoweek').format('x');
        var end = +moment(monthTimestamp).endOf('month').endOf('isoweek').format('x');

        console.log('getDaysForCalendarFromSessions: start, end = ', start, end);

        while (+start < +end){
            k = k + 1;
            var sT = start + '';
            if (map[sT] == undefined){
                arr.push({
                    isVoid: true,
                    start: start
                });
            }else {
                arr.push(assign({}, map[sT], {isVoid: false}));
            }
            start = +start + 24 * 60 * 60 * 1000;
        }
        var d = 1;
        for (var i in arr){
            if (arr[i].isVoid == true){
                arr[i].numberOfDaysFromLastTraining = d;
                d++;
            }else {
                d = 1;
            }
        }
        d = 1;
        for (var i = arr.length - 1; i > -1; i--){
            if (arr[i].isVoid == true){
                arr[i].numberOfDaysToLastTraining = d;
                d++;
            }else {
                d = 1;
            }
        }
        for (var i in arr){
            if (arr[i].isVoid == true){
                if (+arr[i].numberOfDaysToLastTraining > this.TRAINING_DAY_SPAN && +arr[i].numberOfDaysFromLastTraining > this.TRAINING_DAY_SPAN){
                    if (arr[i].start < +moment().endOf('day').format('x')){
                        arr[i].isMissed = true;
                    }
                }else {
                    arr[i].isMissed = false;
                }
            }
        }

        console.log('getDaysForCalendarFromSessions occured: arr = ', arr);

        return arr;
    },

    getWeeksForCalendarFromSessions: function(monthTimestamp, sessions){
        var days = this.getDaysForCalendarFromSessions(monthTimestamp, sessions);
        var weeks = [];
        var n = Math.ceil(days.length / 7.0);
        for (var i = 0; i < n; i++){
            weeks.push({
                number: i,
                days: days.slice(i * 7, (i + 1) * 7)
            });
        }
        return weeks;
    },

    generateRandomSessions: function(startTimestamp, number){
        var ACTIVITIES = ['RUNNING', 'SWIMMING', 'BIKE', undefined];
        var arr = [];
        var t = startTimestamp;
        var energy = undefined;
        var deltaEnergy = 0;
        for (var i = 0; i < number; i++){
            if (i == 0){
                energy = 45;
            }
            var deltaDay = Math.floor(5 * Math.random()) + 2;
            t = t + deltaDay * 24 * 60 * 60 * 1000;
            var actNum = Math.floor(4 * Math.random());
            var hasEnergy = (Math.random() > 0.7);
            deltaEnergy = 0;
            if (hasEnergy == true){
                deltaEnergy = Math.floor(Math.random() * 4) - 1;
            }
            energy = (hasEnergy == false) ? energy : (energy + deltaEnergy);
            if (deltaEnergy == 0){
                deltaEnergy = undefined;
            }
            var avrHR = 105 + Math.floor(Math.random() * 67);
            var duration = (29 + Math.floor( Math.random() * 100)) * 60 * 1000;
            if (t > new Date().getTime()){
                break;
            }
            arr.push({
                start: t,
                activity: ACTIVITIES[actNum],
                avrHR: avrHR,
                energy: energy,
                deltaEnergy: deltaEnergy,
                duration: duration
            });
        }
        for (var i in arr){
            if (arr[i].deltaEnergy != undefined){
                arr[i].activity = 'RUNNING';
            }
        }
        console.log('generated sessions: arr = ', arr);
        return arr;
    },

    getMonthRuName: function(timestamp){
        var key = moment(timestamp).format('MMMM').toLowerCase();
        var map = {
            'january': 'Январь',
            'february': 'Февраль',
            'march': 'Март',
            'april': 'Апрель',
            'may': 'Май',
            'june': 'Июнь',
            'july': 'Июль',
            'august': 'Август',
            'september': 'Сентябрь',
            'october': 'Октябрь',
            'november': 'Ноябрь',
            'december': 'Декабрь'
        };
        return map[key];
    },

    getTimePartString: function(x){
        if (x < 10){
            return ('0' + x);
        }
        return x;
    },

    getDurationString: function(dur){
        dur = Math.floor(dur / 60000.0);
        var minutes = dur % 60;
        var hours = Math.floor(dur / 60.0);
        var dur = this.getTimePartString(hours) + ':' + this.getTimePartString(minutes);
        return dur;
    },

    getProgressListBySessions: function(sessions){
        if (sessions == undefined || sessions.length == 0){
            return [];
        }
        var arr = [];
        for (var i in sessions){
            if (sessions[i].start > +moment().endOf('day').format('x')){
                continue;
            }
            if (i == 0 || sessions[i].deltaEnergy != undefined){
                arr.push({
                    timestamp: sessions[i].start,
                    progress: sessions[i].energy
                });
            }
        }
        return arr;
    },

    generateRandomPoints: function(n){
        if (n == undefined){
            n = 2500;
        }
        var times = [];
        var hrs = [];
        var t = 0;
        for (var i = 0; i < n; i++){

            var alpha = Math.PI * (i / 300.0);
            var sin = Math.sin(alpha);

            var rr = 300 + Math.floor(Math.random() * 200) + 250 * (sin + 1);

            var hr = Math.floor(60000.0 / rr);

            hrs.push(hr);
            times.push(t);
            t = t + rr;
        }
        return {
            times: times,
            hrs: hrs
        }
    },

    makePointsDownsampling: function(points, max){
        if (max == undefined){
            max = 700;
        }
        if (points.length <= max){
            return points;
        }
        var arr = [];
        var n = points.length;
        console.log('makePointsDownsampling: length = ' + n);
        var startTime = points[0].t;
        var endTime = points[n - 1].t;
        var dt = 1.0 * (endTime - startTime) / max;

        var step = 1.0 * n / max;
        for (var i = 0; i < max; i++){
            var a = Math.ceil(step * i);
            var b = Math.floor(step * (i + 1));
            b = Math.min(b, n - 1);
            var sum = 0;
            var t = startTime + +points[a].t;
            var kk = 0;
            for (var j = a; j <= b; j++){
                sum+= +points[j].hr;
                kk++;
            }
            //console.log('sum = ', sum);
            var avr = 1.0 * sum / kk;
            //console.log('avr = ', avr);
            arr.push({
                t: t,
                hr: avr
            });
        }
        return arr;
    },

    getImgUrlByActivity: function(activity){
        switch (activity) {
            case 'RUNNING':
                return 'http://www.cardiomood.com/assets/images/RUNNING.png'
                break;
            case 'SWIMMING':
                return "http://www.cardiomood.com/assets/images/swimming.png";
                break;
            case 'BIKING':
                return "http://www.cardiomood.com/assets/images/biker.png";
                break;
            case 'MEASUREMENT_ACTIVITY':
                return 'http://www.cardiomood.com/assets/images/favorite.png';
                break;
            default:
                return "http://www.cardiomood.com/assets/images/faq.png";
                break;
        }
    }

};

module.exports = FitnessHelper;