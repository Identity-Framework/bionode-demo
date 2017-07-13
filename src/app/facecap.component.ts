import { 
  Component, 
  AfterViewInit,
  ViewChild, 
  ElementRef,
  Injectable
} from '@angular/core';

// import out authentication sevice
import { AuthService } from './auth.service';
//import { objectdetect as od } from 'js-objectdetect';
import * as od from 'js-objectdetect';

console.log(od);

@Component({
  selector: 'facecap',
  templateUrl: './facecap.component.html',
  styleUrls: [ './facecap.component.css' ],
})
export class FacecapComponent implements AfterViewInit { 

  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('mediaContainer') container: ElementRef;
  
  access: boolean = false;
  canvasElem: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  ngAfterViewInit(): void { 
    console.log(
      this.canvas,
      this.video
    );
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  ngAfterViewChecked(): void {
    if (this.access) {
      // unhide the media container
      this.container.nativeElement.style.display = 'block';
    }
  }

  getUserMedia(options, successCallback, failureCallback): any {
    /*let api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    */
    let api: Promise<MediaStream> = navigator.mediaDevices.getUserMedia(options);
    if (api) {
      //return api.bind(navigator)(options, successCallback, failureCallback);
      api.then(successCallback)
         .catch(failureCallback);
    } else {
      alert('User Media API not supported. Please update your browser');
    }
  }

  getStream(type): any {
    let constraints = {};
    constraints[type] = true;
    this.getUserMedia(constraints, (stream) => {
      this.access = true;
      let mediaControl = document.querySelector(type);
      mediaControl.srcObject = stream;
      mediaControl.src = (window.URL).createObjectURL(stream);
    },
    (err) => {
      alert(err.name);
      console.log(err.name, err.message);
    });
  }
  greyscale(imageDat) : void {
    let dataArray = imageDat.data;
    for(let i = 0; i < dataArray.length; i += 4)
    {
      let red = dataArray[i];
      let green = dataArray[i + 1];
      let blue = dataArray[i + 2];
      let alpha = dataArray[i + 3];
        
      let gray = (red + green + blue) / 3;
        
      dataArray[i] = gray;
      dataArray[i + 1] = gray;
      dataArray[i + 2] = gray;
      dataArray[i + 3] = alpha; // not changing the transparency
    }
  }
   
  canvasToImage(): any {
    let canvasElem = this.canvas.nativeElement;
    
    let context = canvasElem.getContext('2d');
    let classifier = od.frontalface;
    let detector = new od.detector(canvasElem.width, canvasElem.height, 1.2, classifier);
    console.log(detector);
    let faces = detector.detect(canvasElem);

    context.drawImage(this.video.nativeElement,0,0, canvasElem.width, canvasElem.height);
    console.log(faces);
    
    if(faces.length >= 1){
      let faceData = context.getImageData(faces[0][0], faces[0][1], faces[0][2], faces[0][3]);
      this.greyscale(faceData);
      context.clearRect(0, 0, canvasElem.width, canvasElem.height);
      context.putImageData(faceData,0,0);
    }
      
        
  }

}
