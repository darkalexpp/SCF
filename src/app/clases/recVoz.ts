import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

export class recVoz{
    //speechRec: SpeechRecognition;
    constructor(private sr: SpeechRecognition){
       
    }

    checkPermission() {
        this.sr.hasPermission().then((permission) => {
         if (permission) {
           alert('You have permission for speech recognition');
         } else {
           alert('You do not have permission for speech recognition');
         }
       }, (err) => {
         alert(JSON.stringify(err));
       }
       );
     }
   
     requestPermission() {
       this.sr.requestPermission().then((data) => {
         alert(JSON.stringify(data));
       }, (err) => {
         alert(JSON.stringify(err));
       });
     }
   
     startListening() {
       this.sr.startListening().subscribe((speeches) => {
         alert(speeches[0]);
         return speeches[0];
       }, (err) => {
         alert(JSON.stringify(err));
         return "error";
       });
     }    

     similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();
    
      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }

}