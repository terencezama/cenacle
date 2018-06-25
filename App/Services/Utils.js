const Utils = {

    convertMillisToTime : (ms) => {

        days = Math.floor(ms / (24*60*60*1000));
        daysms=ms % (24*60*60*1000);
        hours = Math.floor((daysms)/(60*60*1000));
        hoursms=ms % (60*60*1000);
        minutes = Math.floor((hoursms)/(60*1000));
        minutesms=ms % (60*1000);
        sec = Math.floor((minutesms)/(1000));
        
        if(hours > 0){
            return `${hours}:${minutes > 10 ? minutes : '0'+minutes}:${sec > 10 ? sec : '0'+sec}`;
        }else{
            return `${minutes > 10 ? minutes : '0'+minutes}:${sec > 10 ? sec : '0'+sec}`;
        }
    }
}

export default Utils;


