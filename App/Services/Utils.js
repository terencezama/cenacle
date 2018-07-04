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
    },

    bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
     },
}

export default Utils;


