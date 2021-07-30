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

}